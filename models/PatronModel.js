//import clientPromise from "../db/mongoDB";
//import { MongoClient, ObjectId, Collection, WithId } from "mongodb";
//import { IEvents, IPatrons, ISeats } from "../utils/interfaces";

/* COLLECTION NAME */
const databaseName = 'ADASeatingDB';
const collectionName = 'patrons';
class PatronModel {
    constructor(client) {
        const db = client.db(databaseName);
        this.collection = db.collection(collectionName);
    }

    async getPatrons(query) {
        try {
            const cursor = this.collection.find(query);
            const patronList = cursor.toArray();
            return patronList;
        } catch (err) {
            console.log(err);
        }
    }

    async addPatron(data) {
        const { eventId, callAhead, fullName, numberRequested, arrived, notes, seatID } = data
        try {
            const result = await this.collection.insertOne(
                {
                    eventId: eventId,
                    callAhead: callAhead,
                    fullName: fullName,
                    numberRequested: numberRequested,
                    arrived: arrived,
                    notes: notes,
                    seatID: seatID,
                }
            )

        } catch (err) {
            console.log(err)
        }
    }

    async updatePatron(patronID, updates) {
        try {
            const result = await this.collection.updateOne(
                { _id: patronID },
                { $set: updates }
            )

            // check if update was successful
            if (result.modifiedCount === 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error updating seat: ", error);
            throw error;
        }
    }

}
export default PatronModel;
