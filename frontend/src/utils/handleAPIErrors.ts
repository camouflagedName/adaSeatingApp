import axios, { AxiosError } from "axios";

export default (error: unknown, location: string, url: string) => {
    console.group(`Error at ${location}`)
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            // The request was made, but the server responded with a status code outside the range of 2xx
            console.log('Error status:', axiosError.response.status);
            //console.log('Error data:', axiosError.response.data);
            console.log(axiosError.response)
            console.groupEnd();
            throw new Error(
                `(Error ${axiosError.response.status}) ${axiosError.response.statusText}: "${url}" `)
        } else {
            console.log(axiosError);
            console.error(`${axiosError.message} at ${url}`)
            console.groupEnd();
            throw new Error(`${axiosError.message} at ${url}`)
        }

    } else {
        console.error("Non-Axios Error: ", (error as Error).message)
        console.groupEnd();
        throw new Error(`Non-Axios Error: ${(error as Error).message}`)
    }

}