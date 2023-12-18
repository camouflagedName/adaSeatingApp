import PatronModel from "../models/PatronModel.js";
import EventModel from "../models/EventModel.js";
import clientPromise from "../db/mongoDB.js";

const client = await clientPromise;
const model = new EventModel(client);

export async function getEvents(req, res) {
    try {
        const query = req.param;
        const result = await model.getEvents();

        if (result) {
            return res.json(result);
        } else {
            console.log(`No events matching query ${query} could be found.`)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error when retrieving event data' });
    }
}

export async function addEvent(req, res) {
    try {
        const query = req.body;
        const result = await model.addEvent(query);

        if (result) return res.json(query);
        else throw new Error(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error when creating event' });
    }
}
