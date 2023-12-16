import { ISortedSeatMap } from "./interfaces";

export interface ISeatMeta {
    [key: string] : boolean;
}

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export interface IEventData {
    name: string;
    date: DateValue;
    seats: string[];
}

export interface IAppEventCreatorData {
    sortedSeatData: ISortedSeatMap;
    seatMeta: {
        [key: string]: boolean;
    };
    updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>>;
}

