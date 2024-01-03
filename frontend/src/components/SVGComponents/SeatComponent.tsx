//import { useContext, useEffect, useState } from "react";
//import { ISeat } from "../../interfaces/interfaces";
//import { LiveEventContext } from "../../context/context"
//import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";

interface SeatComponentProps {
    seatID: string;
    cx: string;
    cy: string;
    seatColor: string;
    handleClick: () => void;
}

const SeatComponent: React.FC<SeatComponentProps> = (
    {
        seatID,
        cx,
        cy,
        seatColor,
        handleClick
    }: SeatComponentProps
) => {

    return (
        <circle
            data-component="svg__seat"
            id={seatID}
            className="seat"
            cx={cx}
            cy={cy}
            r="18"
            onClick={handleClick}
            style={{ fill: `${seatColor}` }}
        >
        </circle>
    )
}


export default SeatComponent;