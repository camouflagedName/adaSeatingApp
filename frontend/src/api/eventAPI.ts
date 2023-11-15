import axios from "axios";
//import API_ROOT from "./apiRoot";
import { ISeat } from "../utils/interfaces";
import { IEventData } from "../utils/creatorInterfaces";

const baseURL = 'http://localhost:30001/' + 'eventAPI'

export const getEvent = async (query?: { [key: string]: string | boolean | object }) => {
    const url = `${baseURL}/events`;

    try {
        const eventList = await axios.get(url, {
            params: query
        })

        return eventList;
    } catch (err) {
        console.log(err)
    }
}
export const addEvent = async (data: IEventData) => {
    const url = `${baseURL}/addEvent`;

    try {
        const res = await axios({
            method: "post",
            url: url,
            data: data,
          });

          return res;
    } catch (err) {
        console.log(err);
    }
}