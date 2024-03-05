import { ObjectId } from "mongodb";

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
            const cursor = await this.collection.find(query);
            const patronList = await cursor.toArray();

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
                    eventID: eventID,
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
            console.error("Database error when adding patron: ", err)
        }
    }

    async updatePatron(patronID, updates) {
        const objectID = new ObjectId(patronID)
        try {
            const result = await this.collection.updateOne(
                { _id: objectID },
                { $set: updates }
            )
            
            // check if update was successful
            if (result.modifiedCount === 1) return true;

            //TODO: improve
            else throw new Error("modification unsucessfull");
        } catch (error) {
            //TODO: log error
            console.error("Error updating patron at patron model: ", error);
            return false;
        }
    }

}
export default PatronModel;
