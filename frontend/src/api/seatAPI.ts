import axios from "axios";
import API_ROOT from "./apiRoot";
import { ISeat } from "../interfaces/interfaces";
import handleAPIErrors from "../utils/handleAPIErrors";

const baseURL = API_ROOT + 'seatAPI'

export const getAllSeats = async () => {
    const url = `${baseURL}/allSeats`;

    try {
        const seatList = await axios.get(url);
        if (seatList && seatList.data) return seatList.data;
        else throw new Error('No data received from seatAPI');

    } catch (err) {
        handleAPIErrors(err, "getAllSeats", url)
    }
}

export const addSeat = async (data: ISeat) => {
    const url = `${baseURL}/addSeat`;

    try {
        return await axios({
            method: "post",
            url: url,
            data: data,
          });
    } catch (err) {
        console.log(err);
    }
}

export const getSeats = async (query: { [key: string]: string | boolean | object }) => {
    const url = `${baseURL}/getSeats`;

    try {
        return await axios.put(url, {
            params: query,
        });

    } catch (err) {
        handleAPIErrors(err, "getSeats", url);
    }
}


interface UpdateSeatData {
    seatID: string | string[];
    assignedTo: string;
    available: boolean;
}

export const updateSeat = async (data: UpdateSeatData ) => {
    const { seatID } = data;
    let url = `${baseURL}/updateSeat/`;

    if (!Array.isArray(seatID)) url += seatID;

    try {
        return await axios({
            method: "put",
            url: url,
            data: data,
        })
    } catch (err) {
        handleAPIErrors(err, 'updateSeat', url)
    }
}