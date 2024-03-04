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

export const updatePatronAPI = async (id: string, data: object) => {
    const url = `${baseURL}/update/${id}`;


    try {
        const res = await axios.put(url, data)
        if (res.status === 200) {
            return res;
        } else throw new Error(`Error status ${res.status}`);
    } catch (err) {
        handleAPIErrors(err, "updatePatron", url);
    }
}

export const addPatronAPI = async (data: IPatronData) => {
    const url = `${baseURL}/addPatron`;

    try {
        const res = await axios({
            method: "post",
            url: url,
            data: data,
        });

        if (res.status === 200) {
            return res.data;
        } else throw new Error(`Error status ${res.status}`);
    } catch (err) {
        handleAPIErrors(err, "addPatron", url);
        return null
    }
}