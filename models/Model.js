import { MongoClient } from "mongodb";

class ADASeatingModel {
    /**
     * 
     * @param {MongoClient} client 
     * @param {string} databaseName 
     * @param {string} collectionName 
     */
    constructor(client, databaseName, collectionName) {
        const db = client.db(databaseName);
        this.collection = db.collection(collectionName);
        this.client = client;
    }
}

export default ADASeatingModel;