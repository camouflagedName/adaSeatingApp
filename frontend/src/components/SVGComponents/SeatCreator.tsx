import { useEffect, useState } from "react";
import { ISeat } from "../../utils/interfaces";
import { ISeatMeta } from "../../utils/creatorInterfaces";

const SeatCreator = ({ seatData, cx, cy, isSelected, updateMeta }: { seatData: ISeat, cx: string, cy: string, isSelected: boolean, updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>> }) => {
    const [seatSelected, setSeatSelected] = useState(isSelected);

    const handleClick = (data: ISeat) => {
        updateMeta(prev => {
            const copyOfPrev = {
                ...prev,
                [seatData._id]: {
                    seat: seatData,
                    isSelected: !seatSelected,
                }
            };

            return copyOfPrev;
        })

        setSeatSelected(!seatSelected);

    }

    useEffect(() => {
        setSeatSelected(isSelected)
    }, [isSelected])

    return (
        <circle
            data-component="svg__seat"
            id={seatData._id}
            className="seat"
            data-seat-name={seatData.seatNumber.toString()}
            cx={cx}
            cy={cy}
            r="18"
            onClick={() => handleClick(seatData)}
            style={{ fill: `${seatSelected ? "#026cdf" : "#ebebeb"}` }}
        >
        </circle>
    )
}


export default SeatCreator;