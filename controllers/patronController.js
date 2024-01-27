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
            //TODO: improve
            console.log(`No patrons matching query ${query} could be found.`)
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error when retrieving patron data' });
    }
}


export async function updatePatron(req, res) {
    const { patronID } = req.params;
    const updates = req.body;

    try {
        const success = await model.updatePatron(patronID, updates);
        console.log(success);
        res.status(200).json(success)

    } catch (err) {
        console.error("At patron controller: ", err)
        res.status(500).json({ message: "Internal Server Error when attempting to update patron data"})
    }
}

export async function addPatron(req, res) {
    const patronData = req.body;
    try {
        const result = await model.addPatron(patronData);

        if (result) return res.status(200).json(patronData)
        else throw new Error(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error when adding new patron"})
    }
}