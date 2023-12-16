import { useContext, useEffect, useState } from "react";
import { ISeat } from "../../interfaces/interfaces";
import { LiveEventContext } from "../../context/context"
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";

interface SeatComponentProps {
    seatData: ISeat;
    cx: string;
    cy: string;
    seatAvailable: boolean;
}

const SeatComponent: React.FC<SeatComponentProps> = ({ seatData, cx, cy, seatAvailable }:
    { seatData: ISeat, cx: string, cy: string, seatAvailable: boolean }) => {
    const [seatColor, setSeatColor] = useState("#ebebeb");
    const data = useContext(LiveEventContext);
    const { addSelectedSeat, removeSelectedSeat } = data as IAppLiveEventData;

    const handleThisClick = () => {
        if (seatColor === "#ebebeb") {
            setSeatColor("#9fc5ef");
            addSelectedSeat(seatData);
        }
        else if (seatColor === "#9fc5ef") {
            setSeatColor("#ebebeb");
            removeSelectedSeat(seatData);
        }
    }

    useEffect(() => {
        setSeatColor(seatAvailable ? "#ebebeb" : "#026cdf")
    }, [seatAvailable])

    return (
        <circle
            data-component="svg__seat"
            id={seatData._id}
            className="seat"
            data-seat-name={seatData.seatNumber.toString()}
            cx={cx}
            cy={cy}
            r="18"
            onClick={handleThisClick}
            style={{ fill: `${seatColor}` }}
        >
        </circle>
    )
}


export default SeatComponent;