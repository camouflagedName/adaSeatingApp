import { ComponentType, useContext, useEffect, useState } from "react";
import { ISeat } from "../../interfaces/interfaces";
import { LiveEventContext } from "../../context/context";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";


interface SeatComponentProps {
    cx: string;
    cy: string;
    seatAvailable: boolean;
    seatData: ISeat;
}

interface PassedProps {
    cx: string;
    cy: string;
    seatID: string;
    seatColor: string;
    handleClick: () => void;
}

const withLiveEventSeatLogic = <P extends SeatComponentProps>(WrappedComponent: ComponentType<PassedProps>) => {
    const SeatComponent: React.FC<P> = (props) => {
        const { seatData, seatAvailable } = props;
        const [seatColor, setSeatColor] = useState("#ebebeb");
        const data = useContext(LiveEventContext);
        const { addSelectedSeat, removeSelectedSeat } = data as IAppLiveEventData;


        const handleClick = () => {
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
            <WrappedComponent
                {...props as P}
                seatID={seatData._id}
                seatColor={seatColor}
                handleClick={handleClick}
            />
        )
    }
    return SeatComponent;
}

export default withLiveEventSeatLogic;