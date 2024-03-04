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
        if (Array.isArray(seatID)) this.updateMultipleSeats(seatID, updates);
        else {
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
    }

    async getAllSeats() {
        try {
            //const query = { available: true };
            const allSeats = await this.collection.find().toArray();
            return allSeats;
        } catch (err) {
            console.error("Error getting all seats at SeatsModel ", err);
        }
    }


    async getEventSeats(query) {
        const seatIDArray = query.seatIDs

        const objectIDArray = seatIDArray.map(seatID => new ObjectId(seatID));
        try {
            const eventSeats = await this.collection
                .find({ _id: { $in: objectIDArray } })
                .toArray();
            return eventSeats;
        } catch (err) {
            console.error("Error getting event seats: ", err);
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
                if (result.modifiedCount === seatID.length) return true;
                else {
                    //TODO: improve messaging/handling
                    console.log("Not all seats could be modified.")
                    return false;
                }
            }

        } catch (error) {
            console.error("Error updating multiple seats: ", error);
            throw error;
        }
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
            //TODO
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
            //TODO
            console.log(err)
        }
    }

    async resetSeats() {
        try {
            const result = await this.collection.updateMany(
                {},
                {
                    $set: {
                        available: true,
                        assignedTo: "",
                    }
                },
                (updateErr, result) => {
                    if (updateErr) {
                        console.error('Error occurred while reseting seats', updateErr);
                        this.client.close();
                        return false;
                    }
                }
            )
        } catch (err) {
            //TODO
        }
    }
}
export default SeatModel;
