import { ComponentType, useEffect, useState } from "react";
import { ISeat } from "../../interfaces/interfaces";

interface SeatComponentProps {
    seatData: ISeat;
    cx: string;
    cy: string;
    isSelected: boolean;
    update: (param: ISeat) => void;
}

interface PassedProps {
    seatData: ISeat;
    cx: string;
    cy: string;
    seatSelected: boolean;
    handleClick: () => void;
}

const withSeatCreatorLogic = (WrappedComponent: ComponentType<PassedProps>) => {
    const SeatComponent: React.FC<SeatComponentProps> = (props) => {
        const { seatData, isSelected, update } = props;
        const [seatSelected, setSeatSelected] = useState(isSelected);

        const handleClick = () => {
            update(seatData)
            setSeatSelected(!seatSelected);
        }

        useEffect(() => {
            setSeatSelected(isSelected)
        }, [isSelected])

        return (
            <WrappedComponent
                {...props as SeatComponentProps}
                seatSelected={seatSelected}
                handleClick={handleClick}
            />
        )
    }
    return SeatComponent;
}

export default withSeatCreatorLogic;