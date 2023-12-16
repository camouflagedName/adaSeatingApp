import { IPatronData, ISeat } from "../interfaces/interfaces";

type DataArray = IPatronData[] | ISeat[];
type SingleOption = IPatronData | ISeat;
type Selected = DataArray | SingleOption;
/**
 * Combines and updates old data with altered data
 */
const dataUpdater = (mainArray: DataArray, selected: Selected, changedData: object) => {

    if (Array.isArray(selected)) {
        const filteredSeats = mainArray.filter(mainData => !selected.some(selectedData => selectedData._id === mainData._id));
        const updatedSelectedSeatArr = selected.map(data => ({ ...data, ...changedData }));

        return [...filteredSeats, ...updatedSelectedSeatArr];
    } else if (!Array.isArray(selected)) {
        const filteredSeats = mainArray.filter(mainData => mainData._id !== selected._id);
        const updatedSelectedSeat = [{ ...selected, ...changedData }];

        return [...filteredSeats, ...updatedSelectedSeat];
    }

    return [];
}

export default dataUpdater;