import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import Wavers from "./components/Wawers/Wawers";
import Winners from "./components/Winners/Winners";
import Buttons from "./components/Buttons/Buttons";
import Bio from "./components/Bio/Bio";
import Notifications from "./components/Notifications/Notifications";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [mining, setMining] = useState(false);
  const [showWinners, setShowWinners] = React.useState(false)
  const [showWavers, setShowWavers] = React.useState(false)
  const [allWaves, setAllWaves] = useState([]);
  const [allWinners, setAllWinners] = useState([]);
  const [win, setWin] = useState(false);
  const contractAddress = "0x9c004548Dc32Ed56E50282015c2Cda38895DE8b2";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({method: "eth_accounts"});
      console.log(accounts)

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        await getAllWaves()
        await getAllWinners()
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected", accounts[0]);
      await getAllWaves()
      await getAllWinners()
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      setWin(false)
      setMining(true)
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave("Dude this works actually!", { gasLimit: 300000 })
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setMining(false)

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllWaves = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waves = await wavePortalContract.getAllWaves();

        const wavesCleaned = waves.map(wave => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
            success: wave.success,
          };
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWinners = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const winners = await wavePortalContract.getAllWinners();

        const winnersCleaned = winners.map(winner => {
          return {
            address: winner.winner,
            timestamp: new Date(winner.timestamp * 1000),
          };
        });

        setAllWinners(winnersCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listen in for emitter events!
   */
  useEffect(() => {

    checkIfWalletIsConnected()

    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    const onNewWinner = (from, timestamp) => {
      console.log("NewWinner", from, timestamp);
      setWin(true)
      setAllWinners(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on("NewWave", onNewWave);
      wavePortalContract.on("NewWinner", onNewWinner);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
        wavePortalContract.on("NewWinner", onNewWinner);
      }
    };
  }, []);

  const handleClickWavers = () => {
    setWin(false)
    setShowWinners(false)
    setShowWavers(!showWavers);
  };

  const handleClickWinners = () => {
    setWin(false)
    setShowWavers(false)
    setShowWinners(!showWinners);
  };

  return (
      <div className="mainContainer">
        <div className="dataContainer">

          <Bio />

          <Buttons wave={wave}
                   currentAccount={currentAccount}
                   connectWallet={connectWallet}
                   handleClickWavers={handleClickWavers}
                   handleClickWinners={handleClickWinners}
                   />

          <Notifications mining={mining} win={win} />

          {showWinners ? <Winners allWinners={allWinners}/> : null}

          {showWavers ? <Wavers allWaves={allWaves} /> : null}

        </div>
      </div>
  );
}

export default App