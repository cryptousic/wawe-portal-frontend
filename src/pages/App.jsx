import React from "react";
import "./App.css";
import Buttons from "../components/Buttons/Buttons";
import Bio from "../components/Bio/Bio";
import {useGetAllWaves} from "../hooks/useGetAllWaves"
import {useGetAllWinners} from "../hooks/useGetAllWinners"
import {useWallet} from "../hooks/useWallet";

const App = () => {
    const {wavesList, getWavesList} = useGetAllWaves();
    const {winnersList, getWinnersList} = useGetAllWinners();

    const run = () => {
        getWavesList();
        getWinnersList();
    };
    const {currentAccount, connectWallet} =
        useWallet(run);

    return (
        <div className="mainContainer">
            <div className="dataContainer">

                <Bio/>

                <Buttons currentAccount={currentAccount}
                         connectWallet={connectWallet}
                         wavesList={wavesList}
                         winnersList={winnersList}
                />

            </div>
        </div>
    );
}

export default App