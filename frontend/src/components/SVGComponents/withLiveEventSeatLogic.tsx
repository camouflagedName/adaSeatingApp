import { ComponentType, useEffect, useState } from "react";
import { ISeat } from "../../interfaces/interfaces";


interface SeatComponentProps {
    cx: string;
    cy: string;
    isAvailable: boolean;
    sortedInPlaySeats: ISeat[];
    update: (param: ISeat | ISeat[]) => void
}

interface PassedProps {
    cx: string;
    cy: string;
    seatColor: string;
    handleClick: () => void;
}

const withSeatCreatorLogic = <P extends SeatComponentProps>(WrappedComponent: ComponentType<PassedProps>) => {
    const SeatComponent: React.FC<P> = (props) => {
        const { isAvailable, sortedInPlaySeats, update } = props;
        const [seatColor, setSeatColor] = useState("#ebebeb");


        const handleClick = (seatData: ISeat | ISeat[] = sortedInPlaySeats) => {
            if (seatColor === "#ebebeb") {
                setSeatColor("#9fc5ef");
            }
            else if (seatColor === "#9fc5ef") {
                setSeatColor("#ebebeb");
            }

            update(seatData);
        }
    
        useEffect(() => {
            setSeatColor(isAvailable ? "#ebebeb" : "#026cdf")
        }, [isAvailable])
    

        return (
            <WrappedComponent
                {...props as P}
                seatColor={seatColor}
                handleClick={handleClick}
            />
        )
    }
    return SeatComponent;
}

export default withSeatCreatorLogic;