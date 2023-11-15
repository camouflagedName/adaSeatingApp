import axios from "axios";
import { IPatronData } from "../utils/interfaces";

const baseURL = 'http://localhost:30001/' + 'patronAPI'

export const getPatrons = async (query: { [key: string]: string | boolean | object }) => {
    const url = `${baseURL}/patrons`;

    try {
        const patronList = await axios.get(url, {
            params: query
        })

        return patronList;
    } catch (err) {
        console.log(err)
    }
}

export const updatePatron = async (id: string, data: object) => {
    const url = `${baseURL}/update/${id}`;

    try {
        const res = await axios.put(url, data)
        if (res) {
            console.log(res)
            return res;
        }
    } catch (err) {
        console.log(err)
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
        console.error('Error when adding patron: ', err)
    }
}