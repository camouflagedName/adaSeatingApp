import { IPatronData, ISeat, ISortedSeatMap } from "./interfaces";

type UpdatePatrons = React.Dispatch<React.SetStateAction<IPatronData[]>>;
type UpdateSessionSeats = React.Dispatch<React.SetStateAction<ISeat[]>>

export interface IAppLiveEventData {
    sortedInPlaySeats: ISeat[];
    sortedStructInPlaySeats: ISortedSeatMap;
    seatDataMap: Map<string, ISeat>
    patronData: IPatronData[];
    patronDataMap: Map<string, IPatronData>
    updatePatrons: UpdatePatrons;
    updateSessionSeats: UpdateSessionSeats;
    savePatronsToSeats:  (selectedSeat: ISeat, selectedPatron: IPatronData) => void;
    addSelectedSeat: (data: ISeat) => void;
    removeSelectedSeat: (data: ISeat) => void;
}

/*
                sortedInPlaySeats: sortedInPlaySeats,
                sortedStructInPlaySeats: sortedStructInPlaySeats,
                seatDataMap: seatDataMap,
                patronData: patronData,
                patronDataMap: patronDataMap,
                updatePatrons: updatePatrons,
                updateSessionSeats: updateSessionSeats,
                savePatronsToSeats: savePatronsToSeats,
*/