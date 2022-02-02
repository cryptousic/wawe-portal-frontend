import { useEffect, useState } from 'react';
import { getWavePortalContract } from '../utils/getter';

export function useGetAllWinners() {
    const [winnersList, setWinnersList] = useState([]);

    const getWinnersList = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) return;

            const wavePortalContract = getWavePortalContract(ethereum);
            const winners = await wavePortalContract.getAllWinners();

            const winnersCleaned = winners.map(winner => {
                return {
                    address: winner.winner,
                    timestamp: new Date(winner.timestamp * 1000),
                };
            });

            setWinnersList(winnersCleaned);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Listen in for emitter events!
     */
    useEffect(() => {

        let wavePortalContract;

        const onNewWinner = (from, timestamp) => {
            console.log("NewWinner", from, timestamp);
            setWinnersList(prevState => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                },
            ]);
        };

        if (window.ethereum) {
            wavePortalContract = getWavePortalContract(window.ethereum);
            wavePortalContract.on("NewWinner", onNewWinner);
        }

        return () => {
            if (wavePortalContract) {
                wavePortalContract.on("NewWinner", onNewWinner);
            }
        };
    }, []);

    return { winnersList, setWinnersList, getWinnersList };
}
