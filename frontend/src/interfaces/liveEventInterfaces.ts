import { ISeat, ISortedSeatMap } from "./interfaces";

export interface IAppLiveEventData {
    sortedInPlaySeats: ISeat[];
    sortedStructInPlaySeats: ISortedSeatMap;
    seatDataMap: Map<string, ISeat>
}