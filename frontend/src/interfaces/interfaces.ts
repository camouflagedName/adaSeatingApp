
export interface ISeat {
    _id: string;
    eventId: string;
    floor: number;
    section: string;
    row: string;
    seatNumber: number;
    available: boolean;
    inPlay: boolean;
    assignedTo: string;
}

export interface ISortedSeatMap {
    tierARowA: ISeat[];
    tierARowB: ISeat[];
    tierCRight: ISeat[];
    tierCLeft: ISeat[];
    tierCLeftCenter: ISeat[];
    tierCRightCenter: ISeat[];
    secondRightWing: ISeat[];
    secondLeftWing: ISeat[];
    thirdRightWing: ISeat[];
    thirdLeftWing: ISeat[];
}

type UpdateEvent = React.Dispatch<React.SetStateAction<IEventData[]>>;
type UpdatePatrons = React.Dispatch<React.SetStateAction<IPatronData[]>>;
type UpdateSeats = React.Dispatch<React.SetStateAction<ISeat[]>>;

export interface IAppData {
    seatData: ISeat[];
    eventData: IEventData[];
    patronData: IPatronData[];
    patronDataMap: Map<string, IPatronData>
    updateEvents: UpdateEvent;
    updateSeats: UpdateSeats;
    updatePatrons: UpdatePatrons;
}

export interface IPatronData {
    _id: string;
    eventID: string;
    fullName: string;
    callAhead: boolean;
    numberRequested: number;
    arrived: boolean;
    notes: string[];
    seatID: string[];
}

export interface IEventData {
    _id: string;
    name: string;
    date: Date;
    patrons?: string[];
    seats?: string[];
}