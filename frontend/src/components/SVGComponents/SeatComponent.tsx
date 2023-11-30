import { ISeat } from "../../interfaces/interfaces";

interface SeatComponentProps {
    seatData: ISeat;
    cx: string;
    cy: string;
    seatSelected: boolean;
    handleClick: () => void;
  }

const SeatComponent: React.FC<SeatComponentProps> = ({ seatData, cx, cy, seatSelected, handleClick }: { seatData: ISeat, cx: string, cy: string, seatSelected: boolean, handleClick: () => void }) => {

    return (
        <circle
            data-component="svg__seat"
            id={seatData._id}
            className="seat"
            data-seat-name={seatData.seatNumber.toString()}
            cx={cx}
            cy={cy}
            r="18"
            onClick={handleClick}
            style={{ fill: `${seatSelected ? "#026cdf" : "#ebebeb"}` }}
        >
        </circle>
    )
}


export default SeatComponent;