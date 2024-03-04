import { ComponentType, useEffect, useState } from "react";
import { ISeat } from "../../interfaces/interfaces";
import { ISeatMeta } from "../../interfaces/creatorInterfaces";

interface SeatComponentProps {
    seatData: ISeat;
    cx: string;
    cy: string;
    isSelected: boolean;
    updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>>;
}

interface PassedProps {
    cx: string;
    cy: string;
    seatID: string;
    seatColor: string;
    handleClick: (param: SVGCircleElement | undefined) => void;
}

const withEventCreatorSeatLogic = <P extends SeatComponentProps>(WrappedComponent: ComponentType<PassedProps>) => {
    const SeatComponent: React.FC<P> = (props) => {
        const { seatData, isSelected, updateMeta } = props;
        const [seatSelected, setSeatSelected] = useState(isSelected);
        const [seatColor, setSeatColor] = useState("#ebebeb");

        const handleClick = () => {
            updateMeta(prev => {
                return { ...prev, [seatData._id]: !isSelected }
            });

            if (seatColor === "#ebebeb") setSeatColor("#026cdf");
            else if (seatColor === "#026cdf") setSeatColor("#ebebeb");

            setSeatSelected(!seatSelected);
        }

        useEffect(() => {
            if (isSelected) setSeatColor("#026cdf");
            else setSeatColor("#ebebeb")
            setSeatSelected(isSelected)

        }, [isSelected]);

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

export default withEventCreatorSeatLogic;