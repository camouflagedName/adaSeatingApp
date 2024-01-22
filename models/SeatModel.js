//import { ObjectId, MongoClient, Document } from "mongodb";
import pkg from 'mongodb';
const { ObjectId, MongoClient, Document } = pkg;

/* COLLECTION NAME */
const databaseName = 'ADASeatingDB';
const collectionName = 'seats';

/**
 * 
 */
class SeatModel {
    /**
     * 
     * @param {MongoClient} client 
     */
    constructor(client) {
        const db = client.db(databaseName);
        this.collection = db.collection(collectionName);
        this.client = client;
    }

    /**
     * 
     * @param {string} seatID 
     * @param {Document} updates 
     * @returns boolean
     */
    async updateSeat(seatID, updates) {
        try {
            const objectID = new ObjectId(seatID)
            const result = await this.collection.updateOne(
                { _id: objectID },
                { $set: updates }
            )

            // check if update was successful
            if (result.modifiedCount === 1) return true;
            else return false;

        } catch (error) {
            console.error("Error updating seat: ", error);
            throw error;
        }
    }


    /**
 * 
 * @param {Array<string>} seatID 
 * @param {Document} updates 
 * @returns boolean
 */
    async updateMultipleSeats(seatID, updates) {
        try {

            if (seatID.length === 1) {
                const objectID = new ObjectId(seatID[0])
                const result = await this.collection.updateOne(
                    { _id: objectID },
                    { $set: updates }
                )

                // check if update was successful
                if (result.modifiedCount === 1) return true;
                else return false;
            } else if (seatID.length > 1) {
                const objectIDArray = seatID.map(id => new ObjectId(id));

                const result = await this.collection.updateMany(
                    { _id: { $in: objectIDArray } },
                    { $set: updates },
                    (updateErr, result) => {
                        if (updateErr) {
                            console.error('Error occurred while updating seats', updateErr);
                            this.client.close();
                            return false;
                        }
                    }
                )

                // TODO: fix return

                console.log(result.modifiedCount);
                return true;

            }

        } catch (error) {
            console.error("Error updating multiple seats: ", error);
            throw error;
        }
    }


    async getAvailableSeatsForEvent() {
        const query = { available: true };
        const availableSeats = await this.collection.find(query).toArray();

        return availableSeats;
    }

    async resetSeats() {

    }


    // set if in play? by row? by section??
    async setAvailableSeatsForEvent(section, row) {
        try {
            const result = await this.collection.updateMany(
                { section: section, row: row, inPlay: true },
                { $set: { available: true, inPlay: true } }
            );

            console.log("Seats successfully updated: ", result);
        } catch (err) {
            console.log("Database error: ", err)
        }
    }

    async assignPatrons(section, seatNumber, row, patron, callAhead) {
        const { fullName: name, _id: patronID } = patron;
        try {
            const result = await this.collection.updateOne(
                {
                    section: section,
                    seatNumber: seatNumber,
                    row: row
                },
                {
                    $set: {
                        available: false,
                        patron: {
                            patronId: patronID,
                            name: name,
                            callAhead: callAhead
                        }
                    }
                }
            )

            if (result) console.log(`Patron ${patronID} added successfully.`)
            else console.log("Patron unable to be added.")
        } catch (err) {

        }

    }

    async getAvailableSeatCount() {

    }

    async addSeat(data) {
        const { eventId, floor, section, seatNumber, available, inPlay, row } = data
        try {
            const result = await this.collection.insertOne(
                {
                    eventId: eventId,
                    floor: floor,
                    section: section,
                    row: row,
                    seatNumber: seatNumber,
                    available: available,
                    inPlay: inPlay,
                }
            )

        } catch (err) {
            console.log(err)
        }
    }
}
export default SeatModel;
