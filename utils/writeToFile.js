import fs from 'fs/promises';  // Import the fs module for file operations

/**
 * Writes a log message to a file.
 * @param {string} logMessage 
 * @param {string} file
 */
async function writeToFile(logMessage, file) {
    const timestamp = new Date().toISOString();
    const header = `/*** ${timestamp} ***/\n`
    const formattedLogMessage = header + logMessage

    try {
        await fs.access(file);
        await fs.appendFile(file, formattedLogMessage);
        console.log(`${file} updated successfully`);
    } catch (accessErr) {
        try {
            await fs.writeFile(file, formattedLogMessage);
            console.log(`${file} created and updated`);
        } catch (writeErr) {
            console.error(`Error when creating and writing to ${file}:`, writeErr);
        }
    }
}

export default writeToFile;