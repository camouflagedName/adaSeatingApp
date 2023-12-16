import axios from "axios";
import API_ROOT from "./apiRoot";
import handleAPIErrors from "../utils/handleAPIErrors";

const url = API_ROOT + 'ping';

export default async () => {

    try {
        const response = await axios.get(url);

        if (response && response.status) return response.status;

    } catch (err) {
        handleAPIErrors(err, "server check", url)
    }
}
