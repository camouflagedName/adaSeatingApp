import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
import { useContext } from 'react'
import { LiveEventContext } from "../../context/context"
import SeatComponent from "./SeatComponent";
import withLiveEventSeatLogic from "./withLiveEventSeatLogic";
//import SeatComponentPopover from "./SeatComponentPopover";
//TODO: fix seat numbers
const LiveEventSeat = withLiveEventSeatLogic(SeatComponent);

interface ToolTipData {
    cx: string;
    cy: string;
    patronID: string;
}

interface SeatProps {
    onToggle: () => void;
    handleToolTipData: (param?: ToolTipData) => void;
    isOpen: boolean;
    zoom: number;
}

const Seats = ({ onToggle, handleToolTipData, isOpen, zoom }: SeatProps) => {
    const data = useContext(LiveEventContext);
    const { sortedStructInPlaySeats } = data as IAppLiveEventData;
    const { tierARowA, tierARowB, tierCLeft, tierCLeftCenter, tierCRight, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedStructInPlaySeats;

    const tierARowASeatStart = 101;
    const tierARowBSeatStart = 101;

    const tierCRightSeatStart = 101;
    const tierCRightCenterStart = 107;
    const tierCLeftCenterStart = 123;
    const tierCLeftSeatStart = 138;

    const secondFloorLeftSeatStart = 101;
    const secondFloorRightSeatStart = 101;

    const thirdFloorLeftSeatStart = 101;
    const thirdFloorRightSeatStart = 101;

    return (
        <g className="seats">
            {
                (tierARowA && tierARowB) &&
                <g data-component="svg__block" data-section-name="TierA" data-section-id="s_57" className="section" transform="">
                    {
                        tierARowA &&
                        <g data-component="svg__row" data-row-name="A" className="row" >
                            {
                                tierARowA.map((seat) => {
                                    const index = seat.seatNumber - tierARowASeatStart;

                                    const cx = "5600";
                                    const cy = (2580 + 45 * index).toString();

                                    return <LiveEventSeat
                                        key={seat._id}
                                        seatData={seat}
                                        cx={cx}
                                        cy={cy}
                                        seatAvailable={seat.available}
                                        popoverToggle={onToggle}
                                        handleToolTipData={handleToolTipData}
                                        isOpen={isOpen}
                                        zoomFactor={zoom} />
                                })
                            }

                        </g>
                    }
                    {
                        tierARowB &&
                        <g data-component="svg__row" data-row-name="B" className="row">
                            {
                                tierARowB.map(seat => {
                                    const index = seat.seatNumber - tierARowBSeatStart;
                                    const cx = "5680";
                                    const cy = (2580 + 45 * index).toString();

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                (tierCLeft && tierCRight && tierCLeftCenter && tierCRightCenter) &&
                <g data-component="svg__block" data-section-name="TierC" data-section-id="s_57" className="section" transform="">
                    {
                        tierCRight &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRight.map(seat => {
                                    const index = seat.seatNumber - tierCRightSeatStart;

                                    const cx = index < 3 ? (7325 + 45 * index).toString() : "7445"
                                    const cy = index < 3 ? (2225 + 60 * index).toString() : (2225 + 70 * index).toString()

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCRightCenter &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRightCenter.map(seat => {
                                    const index = seat.seatNumber - tierCRightCenterStart;

                                    const cx = "7445";
                                    const cy = (2745 + 70 * index).toString();

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCLeftCenter &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCLeftCenter.map(seat => {
                                    const index = seat.seatNumber - tierCLeftCenterStart;

                                    const cx = "7445";
                                    const cy = (3880 + 70 * index).toString();

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCLeft &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCLeft.map(seat => {
                                    const index = seat.seatNumber - tierCLeftSeatStart;

                                    const cx = index <= 5 ? "7445" : (7625 - 35 * index).toString();
                                    const cy = index < 5 ? (4965 + 70 * index).toString() :
                                        index === 5 ? "5315" : (5100 + 45 * index).toString()

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                (secondLeftWing && secondRightWing) &&
                <g data-component="svg__block" data-section-name="secondFloorWings" data-section-id="s_57" className="section" transform="">
                    {
                        secondRightWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                secondRightWing.map(seat => {
                                    const index = seat.seatNumber - secondFloorRightSeatStart;

                                    const cx = (6400 + 40 * index).toString();
                                    const cy = (2200 + 60 * index).toString();

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />

                                })
                            }
                        </g>
                    }
                    {
                        secondLeftWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                secondLeftWing.map(seat => {
                                    const index = seat.seatNumber - secondFloorLeftSeatStart;

                                    const cx = (6525 - 38 * index).toString();
                                    const cy = (5300 + 55 * index).toString();

                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />

                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                (thirdLeftWing && thirdRightWing) &&
                <g data-component="svg__block" data-section-name="thirdFloorWings" data-section-id="s_57" className="section" transform="">
                    {
                        thirdRightWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                thirdRightWing.map(seat => {
                                    const index = seat.seatNumber - thirdFloorRightSeatStart;

                                    const cx = (8050 + 42 * index).toString()
                                    const cy = (2275 + 62 * index).toString()
                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                    {
                        thirdLeftWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                thirdLeftWing.map(seat => {

                                    const index = seat.seatNumber - thirdFloorLeftSeatStart;

                                    const cx = (8175 - 40 * index).toString()
                                    const cy = (5200 + 60 * index).toString()
                                    return <LiveEventSeat key={seat._id} seatData={seat} cx={cx} cy={cy} seatAvailable={seat.available} popoverToggle={onToggle} handleToolTipData={handleToolTipData} isOpen={isOpen} zoomFactor={zoom} />
                                })
                            }
                        </g>
                    }
                </g>
            }
        </g>
    )
}

export default Seats;