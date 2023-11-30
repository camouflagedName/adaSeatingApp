import { ISeat, IPatronData } from "../interfaces/interfaces";

const mapper = (dataArray: (ISeat | IPatronData)[]): Map<string, IPatronData | ISeat> => {
    const dataMap: Map<string, IPatronData | ISeat> = new Map();

    dataArray.forEach(item => { if (item._id && !dataMap.has(item._id)) dataMap.set(item._id, item) })

    return dataMap
}

export default mapper;