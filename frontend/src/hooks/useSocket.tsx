//TEST + DEBUG IMPLEMENTATION


import { useCallback, useContext, useEffect } from "react";
import MainPage from "../components/MainPage";
import { DataContext } from "../context/context";
import { IAppData, ISeat } from "../interfaces/interfaces";
import dataUpdater from "../utils/dataUpdater";
import seatSorter from "../utils/seatSorter";

interface WebSocketData {
    seatID: string | string[];
    updates: {
        available: boolean,
        assignedTo?: string,
    };
}

const useSocket = ({ seatDataMap, updateSessionSeats, changePage }: { seatDataMap: Map<string, ISeat>, updateSessionSeats: React.Dispatch<React.SetStateAction<ISeat[]>>, changePage: (param: React.ReactElement) => void }) => {
    const contextData = useContext(DataContext);
    const { setEventHasStarted, socket } = contextData as IAppData;

    const handleSeatUpdate = useCallback((data: WebSocketData) => {
        console.log('seat updated')
        console.log('Received data: ', data);

        //TODO: fix and add more logic
        const updatedSeatData = data.updates;
        let seatsToUpdate: ISeat | ISeat[];


        // TODO: update logic after testing ?
        if (Array.isArray(data.seatID)) {
            seatsToUpdate = data.seatID.map(seatID => seatDataMap.get(seatID) as ISeat);
        } else {
            seatsToUpdate = seatDataMap.get(data.seatID) as ISeat;
        }

        updateSessionSeats(prev => {
            const updateCurrentSeats = dataUpdater(prev, seatsToUpdate, updatedSeatData) as ISeat[];
            const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];

            return sortedUpdateCurrentSeats;
        });
    }, [updateSessionSeats, seatDataMap]);

    const handleEventEnd = useCallback((data: object) => {
        console.log('event ended')
        console.log(data);
        setEventHasStarted(false);
        changePage(<MainPage changePage={changePage} />);
    }, [setEventHasStarted, changePage])

    useEffect(() => {
        if (socket) {
            socket.on('seat updated', handleSeatUpdate);
            socket.on('event ended', handleEventEnd)
        } else console.log("NO SOCKET CONNECTION FOUND");

        return () => {
            if (socket) {
                // Removes event listeners
                socket.off('seat updated');
                socket.off('event ended');
            }
        };

    }, [handleEventEnd, handleSeatUpdate, socket]);

}


export default useSocket;