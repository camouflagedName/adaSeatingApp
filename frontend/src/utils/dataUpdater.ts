import { IPatronData, ISeat } from "../interfaces/interfaces";

type DataArray = IPatronData[] | ISeat[];
type SingleOption = IPatronData | ISeat;
type Selected = DataArray | SingleOption;
/**
 * Combines and updates old data with altered data
 */
const dataUpdater = (mainArray: DataArray, selected: Selected, changedData: object) => {

    if (Array.isArray(selected)) {
        const filteredData = mainArray.filter(mainData => !selected.some(selectedData => selectedData._id === mainData._id));
        const updatedSelectedDataArr = selected.map(data => ({ ...data, ...changedData }));

        return [...filteredData, ...updatedSelectedDataArr];
    } else if (!Array.isArray(selected)) {
        const filteredData = mainArray.filter(mainData => mainData._id !== selected._id);
        const updatedSelectedData = [{ ...selected, ...changedData }];

        return [...filteredData, ...updatedSelectedData];
    }

    return [];
}

export default dataUpdater;