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
        console.log(query)
        try {
            const cursor = this.collection.find(query);
            const patronList = cursor.toArray();
            return patronList;
        } catch (err) {
            console.error("Error getting patrons at PatronModel ", err);
        }
    }

    async addPatron(data) {
        const { eventID, callAhead, fullName, numberRequested, arrived, notes, seatID } = data;
        const currentDate = new Date();
        try {
            const result = await this.collection.insertOne(
                {
                    eventId: eventID,
                    callAhead: callAhead,
                    fullName: fullName,
                    numberRequested: numberRequested,
                    arrived: arrived,
                    notes: notes,
                    seatID: seatID,
                    created_on: currentDate,
                }
            )

            return result;

        } catch (err) {
            console.error("Error add patron at patron model: ", err)
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
            console.error("Error updating patron at patron model: ", error);
        }
    }

}
export default PatronModel;
