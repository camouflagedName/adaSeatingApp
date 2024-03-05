import clientPromise from "../db/mongoDB.js";
import ErrorLoggerModel from "../models/ErrorLoggerModel.js";
import writeToFile from "../utils/writeToFile.js";


const databaseName = 'Logs';
const collectionName = 'errors';
const client = await clientPromise;
const model = new ErrorLoggerModel(client, databaseName, collectionName);

/**
 * 
 * @param {Error} error 
 * @param {string} additional
 */
export async function logError(error, additional) {
    if (!(error instanceof Error)) throw TypeError('The first argument must be an instance of Error');

    const currentDate = new Date().toISOString();
    const { name, message, stack } = error;
    const errorLog = {
        created_at: currentDate,
        name: name,
        message: message,
        additional: additional,
        stack: stack || "N/A",
    }

    try {
        const result = await model.logError(errorLog)
        if (result) {
            console.log("Error successfully added to database.")
        } else {
            console.error("Error could not be added into database. Check log for more information.")
        }
    } catch (err) {
        /* this should catch any input errors */
        console.error(err);
        const errorString = JSON.stringify(err, null, 2);
        const formattedError = errorString + "\n"
        await writeToFile(formattedError, 'error.log');
    }

}


export async function getErrors(req, res) {
    try {
        //TODO
    } catch (err) {
        // api response
    }
}