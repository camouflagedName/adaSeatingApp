import ADASeatingModel from "./Model";
const fs = require ('fs');

class ErrorLoggerModel extends ADASeatingModel {

/**
 * @param {Object} errorLog
 * @param {string} errorLog.currentDate
 * @param {string} errorLog.message
 * @param {string} errorLog.additional
 * @param {string} errorLog.stack
 * 
 */
    async logError (errorLog) {

        try {
            const result = await this.collection.insertOne(errorLog);
            console.log(result);

            return result;
        
        } catch (err) {
            /* this should catch any database errors */
            console.error(err);
            const errorString = JSON.stringify(err, null, 2);
            const formattedError = errorString + "\n"
            await writeToFile(formattedError, 'error.log');
        }
    }
}

export default ErrorLoggerModel;