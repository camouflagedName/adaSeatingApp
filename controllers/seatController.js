import SeatModel from "../models/SeatModel.js";
import clientPromise from "../db/mongoDB.js";

const client = await clientPromise;
const model = new SeatModel(client);

export async function getAvailableSeats(req, res) {
    try {
        const result = await model.getAvailableSeatsForEvent();
        if (result) {
            //console.log(result)
            return res.json(result);
        } else {
            console.log("No results could be found.")
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function updateSeat(req, res) {
    const { seatId } = req.params;
    const updates = req.body;
    try {
        const success = await model.updateSeat(seatId, updates);
        console.log(success);
        res.json(success)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export async function addSeat(req, res) {
    const seatData = req.body;
    try {
        res = await model.addSeat(seatData)
        res.json(res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error"})
    }
}