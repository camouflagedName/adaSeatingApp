import { ISeat } from "./interfaces"

export interface ISeatMeta {
    [key: string] : {
        seat: ISeat;
        isSelected: boolean;
    }
}

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export interface IEventData {
    name: string;
    date: DateValue;
    seats: string[];
}