/* import clientPromise from "../db/mongoDB";
import { MongoClient, ObjectId, Collection, WithId } from "mongodb";
import { IEvents, IPatrons, ISeats, EventPatrons, EventSeats } from "../utils/interfaces";

/* COLLECTION NAME */
//const collectionName = 'events';

/* export class EventModel {
    private collection: Collection<IEvents>;

    constructor(client: MongoClient) {
        const db = client.db();
        this.collection = db.collection<IEvents>(collectionName);
    }

// FIX!!
    async addNewEvent(name: string, date: Date, patrons?: EventPatrons[], seats?: EventSeats[]) {
        const document = {
            "name": name,
            "date": date,
            "patrons": {},
            "seats": {},
        }

        if (patrons) document["patrons"] = patrons;
        if (seats) document["seats"] = seats;

        try {
            const result = await this.collection.insertOne(document)
            if (result.insertedId) {
                console.log(result)
            }

        } catch (err) {
            console.log(err);
        }

    }

} */