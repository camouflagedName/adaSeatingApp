import PatronModel from "../models/PatronModel.js";
import clientPromise from "../db/mongoDB.js";

const client = await clientPromise;
const model = new PatronModel(client);

export async function getPatrons(req, res) {
    try {
        const query = req.params;
        const result = await model.getPatrons(query);
        if (result) {
            return res.json(result);
        } else {
            console.log(`No patrons matching query ${query} could be found.`)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error when retrieving patron data' });
    }
}


export async function updatePatron(req, res) {
    const { patronID } = req.params;
    const updates = req.body;
    try {
        const success = await model.updatePatron(patronID, updates);
        console.log(success);
        res.json(success)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error when attempting to update patron data"})
    }
}

export async function addPatron(req, res) {
    const patronData = req.body;
    try {
        res = await model.addPatron(patronData)
        res.json(res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error when adding new patron"})
    }
}