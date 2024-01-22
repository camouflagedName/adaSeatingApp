import axios from "axios";
import { IPatronData } from "../interfaces/interfaces";
import API_ROOT from "./apiRoot";
import handleAPIErrors from "../utils/handleAPIErrors";

const baseURL = API_ROOT + 'patronAPI'

export const getPatrons = async (query: { [key: string]: string | boolean | object }) => {
    const url = `${baseURL}/patrons`;

    try {
        const patronList = await axios.get(url, {
            params: query
        });

        return patronList;
    } catch (err) {
        handleAPIErrors(err, "getPatrons", url)
    }
}

export const updatePatron = async (id: string, data: object) => {
    const url = `${baseURL}/update/${id}`;

    console.log(data)

    try {
        const res = await axios.put(url, data)
        if (res) {
            console.log(res)
            return res;
        }
    } catch (err) {
        handleAPIErrors(err, "updatePatron", url)
    }
}

export const addPatron = async (data: IPatronData) => {
    const url = `${baseURL}/addPatron`;

    try {
        return await axios({
            method: "post",
            url: url,
            data: data,
        });
    } catch (err) {
        handleAPIErrors(err, "addPatron", url)
    }
}