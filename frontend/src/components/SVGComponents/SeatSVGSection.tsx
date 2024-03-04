import { ISeat } from "../../interfaces/interfaces";

const SeatSVGSection = ({ tierARowA, tierARowB }: { tierARowA: ISeat[], tierARowB: ISeat[] }) => {
    //const tierARowASeatStart = 101;
    //const tierARowBSeatStart = 101;
   
    return (
        (tierARowA && tierARowB) &&
        <g data-component="svg__block" data-section-name="TierA" data-section-id="s_57" className="section" transform="">
            {
                tierARowA &&
                <g data-component="svg__row" data-row-name="A" className="row">
                    {
                        tierARowA.map(() => {
                            //const index = seat.seatNumber - tierARowASeatStart;

                            //const cx = "5600";
                            //const cy = (2580 + 45 * index).toString();

                            return null;
                        })
                    }
                </g>
            }
            {
                tierARowB &&
                <g data-component="svg__row" data-row-name="B" className="row">
                    {
                        tierARowB.map(() => {
                            //const index = seat.seatNumber - tierARowBSeatStart;
                            //const cx = "5680";
                            //const cy = (2580 + 45 * index).toString();

                            return null;
                        })
                    }
                </g>
            }
        </g>
    )
}

export default SeatSVGSection;