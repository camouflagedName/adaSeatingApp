
export interface ISeat {
    _id: string;
    eventId: string;
    floor: number;
    section: string;
    row: string;
    seatNumber: number;
    available: boolean;
    inPlay: boolean;
}