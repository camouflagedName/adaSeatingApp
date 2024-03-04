/* COLLECTION NAME */
import { ObjectId } from "mongodb";
const databaseName = 'ADASeatingDB';
const collectionName = 'events';

/**
 * Interface representing the structure of the request body for updating a seat.
 * @typedef {Object} EventUpdateObject
 * @property {string} name - An array of seat IDs to be updated.
 * @property {Date} date - The entity to which the seats are assigned.
 */

//TODO
class EventModel {
    /**
     * 
     * @param {MongoClient} client 
     */
    constructor(client) {
        const db = client.db(databaseName);
        this.collection = db.collection(collectionName);
    }

    async getEvents(query) {
        try {
            const cursor = await this.collection.find(query);
            const eventList = await cursor.toArray();
            return eventList;

        } catch (err) {
            console.log(err);
        }
    }

    async addEvent(data) {
        const { name, date, seats } = data;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        try {
            const res = await this.collection.insertOne({
                name: name,
                date: date,
                seats: seats,
                created_on: currentDate
            })

            return res;

        } catch (err) {
            console.log("Error in Event Model: ", err)
        }
    }

    async getEventSeatIDs(query) {
        const objectID = new ObjectId(query.eventId)
        try {
            const eventSeats = await this.collection.find({ _id: objectID }, { _id: 0, seats: 1 }).toArray();
            return eventSeats;
        } catch (err) {
            console.error("Error gettings event seats: ", err);
            throw err;
        }
    }

    /**
     * @type
     * @param {string} eventID 
     * @param {EventUpdateObject} updates 
     * @returns 
     */
    async updateEvent(eventID, updates) {
        const objectID = new ObjectId(eventID);

        try {
            const result = await this.collection.updateOne(
                { _id: objectID },
                { $set: updates }
            )
            
            console.log(result);
            // check if update was successful
            if (result.modifiedCount >= 1) return true;

            //TODO: improve
            else return false;

        } catch (err) {
            console.error("Error updating event: ", err);
            return false;
        }
    }

}


export default EventModel;
