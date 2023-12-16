/* import { IPatronData, ISeat } from "../interfaces/interfaces";
import dataUpdater from "./dataUpdater";
import seatSorter from "./seatSorter";


const handleUpdate = (sortedInPlaySeats: ISeat[], selectedSeatData: ISeat, selectedPatron: IPatronData) => {
    if (selectedPatron.numberRequested > 1) {
        const mappedSeats = handleSeatUpdateForMultipleSeats(sortedInPlaySeats, selectedSeatData, selectedPatron);
        //if (mappedSeats) updateSeats(mappedSeats);
    }

    else {
        handleSeatUpdateForSingleSeat(sortedInPlaySeats, selectedSeatData, selectedPatron);
    } 

}

const handleSeatUpdateForMultipleSeats = (sortedInPlaySeats: ISeat[], selectedSeatData: ISeat, selectedPatron: IPatronData) => {
    if (selectedPatron._id) {
        const patronID = selectedPatron._id;
        const selectedSeats = getSortedSelectedSeats(sortedInPlaySeats, selectedSeatData, selectedPatron);
        const mappedSeatsArray = mapSeats(sortedInPlaySeats, selectedSeats, patronID);

        return mappedSeatsArray;
    } else console.error(`Selected Patron ${selectedPatron} id failed to update`)
}

const handleSeatUpdateForSingleSeat = (sortedInPlaySeats: ISeat[], selectedSeatData: ISeat, selectedPatron: IPatronData) => {

}


const getSortedSelectedSeats = (sortedInPlaySeats: ISeat[], selectedSeatData: ISeat, selectedPatron: IPatronData): ISeat[] => {
    const sortedSelectedSeats = sortedInPlaySeats.filter(
        seat =>
            seat.section === selectedSeatData.section &&
            seat.row === selectedSeatData.row &&
            seat.seatNumber >= selectedSeatData.seatNumber &&
            seat.seatNumber < selectedSeatData.seatNumber + selectedPatron.numberRequested
    ).sort((a, b) => a.seatNumber - b.seatNumber);

    return sortedSelectedSeats;
}

const mapSeatsToArray = (sortedInPlaySeats: ISeat[], sortedSelectedSeats: ISeat[], patronID: string): ISeat[] => {
    const updatedSeatData = { available: false, assignedTo: patronID }
    const updatedSeats = dataUpdater(sortedInPlaySeats, sortedSelectedSeats, updatedSeatData) as ISeat[];
    const mappedUpdatedSeats = seatSorter(updatedSeats, "array") as ISeat[];

    return mappedUpdatedSeats;

}


const updateUIState = (selectedSeats: ISeat[], selectedPatron: IPatronData) => {
    if (selectedPatron._id) {
        setCurrentSeats(prev => mapSeatsToArray(prev, selectedSeats, selectedPatron._id));
    } else {
        if (selectedPatron._id) {
            setCurrentSeats({ ...selectedSeatData, available: false, assignedTo: selectedPatron._id });
        } else {
            console.error(`Selected Patron ${selectedPatron} id failed to update`);
        }
    }
}; */