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
    seatData: ISeat;
    cx: string;
    cy: string;
    seatSelected: boolean;
    handleClick: () => void;
}

const withSeatCreatorLogic = <P extends SeatComponentProps>(WrappedComponent: ComponentType<PassedProps>) => {
    const SeatComponent: React.FC<P> = (props) => {
        const { seatData, isSelected, updateMeta } = props;
        const [seatSelected, setSeatSelected] = useState(isSelected);

        const handleClick = () => {
            updateMeta(prev => {
                const copyOfPrev = {
                    ...prev,
                    [seatData._id]: !isSelected,
                };

                return copyOfPrev;
            });

            setSeatSelected(!seatSelected);
        }

        useEffect(() => {
            setSeatSelected(isSelected)
        }, [isSelected])

        return (
            <WrappedComponent
                {...props as P}
                seatSelected={seatSelected}
                handleClick={handleClick}
            />
        )
    }
    return SeatComponent;
}

export default withSeatCreatorLogic;