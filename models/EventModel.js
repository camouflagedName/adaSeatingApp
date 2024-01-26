/* COLLECTION NAME */
import pkg from 'mongodb';
const { ObjectId, MongoClient, Document } = pkg;
const databaseName = 'ADASeatingDB';
const collectionName = 'events';

class EventModel {
    constructor(client) {
        const db = client.db(databaseName);
        this.collection = db.collection(collectionName);
    }

    async getEvents(query) {
        try {
            const cursor = await this.collection.find(query);
            const eventList = cursor.toArray();
            return eventList;

        } catch (err) {
            console.log(err);
        }
    }

    async addEvent(data) {
        const { name, date, seats } = data;
        const currentDate = new Date();
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
            const eventSeats = await this.collection.find({ _id: objectID }, {_id: 0, seats: 1}).toArray();

            console.log(eventSeats[0].seats)
            return eventSeats;
        } catch (err) {
            console.error("Error gettings event seats: ", err);
            throw err;
        }
    }

}


export default EventModel;
