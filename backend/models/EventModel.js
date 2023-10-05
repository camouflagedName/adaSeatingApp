/* COLLECTION NAME */
const collectionName = 'events';
export class EventModel {
    constructor(client) {
        const db = client.db();
        this.collection = db.collection(collectionName);
    }
}
