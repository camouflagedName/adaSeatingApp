import SeatModel from "../models/SeatModel.js";
import clientPromise from "../db/mongoDB.js";
//import WebSocket from ''
import { webSocketServer } from "../server.js";

const client = await clientPromise;
const model = new SeatModel(client);

export async function getAvailableSeats(_, res) {
    try {
        const result = await model.getAvailableSeatsForEvent();
        if (result) {
            return res.json(result);
        } else {
            console.log("No seats could be found.")
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

        if (success) {
            webSocketServer.clients.forEach(client => {
                //TODO: add logic to send to each client
                console.log()
            })

        }
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