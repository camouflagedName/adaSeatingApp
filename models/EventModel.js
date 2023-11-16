/* COLLECTION NAME */

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
}

export default EventModel;
