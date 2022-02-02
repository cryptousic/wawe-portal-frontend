import React, {useState} from 'react';
import './Buttons.css'
import {getWavePortalContract} from "../../utils/getter";
import Notifications from "../Notifications/Notifications";
import Wavers from "../Wawers/Wawers";
import Winners from "../Winners/Winners";

const Buttons = (props) => {

    const [win, setWin] = useState(false);
    const [mining, setMining] = useState(false);
    const [showWinners, setShowWinners] = React.useState(false)
    const [showWavers, setShowWavers] = React.useState(false)

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

    const wave = async () => {
        try {
            setWin(false)
            setMining(true)
            const {ethereum} = window;

            if (ethereum) {
                const wavePortalContract = getWavePortalContract(ethereum);

                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                const waveTxn = await wavePortalContract.wave("Dude this works actually!", {gasLimit: 300000})
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
                setMining(false)
                console.log('win before: ' + win)
                await wavePortalContract.on("NewWinner", () => { setWin(true) });
                console.log('win after: ' + win)

                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Buttons">

            <div className="waveButtonDiv">
                <button className="custom-btn btn-9" onClick={wave}>
                    <span>Wave at Me</span>
                </button>
            </div>

            {!props.currentAccount && (
                <div className="waveButtonDiv">
                    <button className="custom-btn btn-9" onClick={props.connectWallet}>
                        <span>Wallet </span>
                    </button>
                </div>
            )}

            <div className="buttons">
                <button onClick={handleClickWavers}
                        className="custom-btn btn-11">Wavers
                    <div className="dot"/>
                </button>

                <button onClick={handleClickWinners}
                        className="custom-btn btn-11">Winners
                    <div className="dot"/>
                </button>
            </div>

            <Notifications mining={mining} win={win} />

            {showWinners ? <Winners allWinners={props.winnersList}/> : null}

            {showWavers ? <Wavers allWaves={props.wavesList} /> : null}
        </div>
    );
}

export default Buttons;
