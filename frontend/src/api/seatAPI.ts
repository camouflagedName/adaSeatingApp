import axios from "axios";
import API_ROOT from "./apiRoot";
import { ISeat } from "../utils/interfaces";

const baseURL = 'http://localhost:30001/' + 'seatAPI'

export const getAllSeats = async () => {
    const url = `${baseURL}/allSeats`;
    console.log("URL: ", url)

    try {
        const seatList = await axios.get(url);
        return seatList;
    } catch (err) {
        console.log(err);
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