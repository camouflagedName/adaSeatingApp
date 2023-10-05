import { ObjectId } from "mongodb";

export interface ISeat {
    _id: ObjectId;
    eventId: ObjectId;
    floor: number;
    section: string;
    row: string;
    seatNumber: number;
    available: boolean;
    inPlay: boolean;
}