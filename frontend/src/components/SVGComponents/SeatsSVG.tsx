import { ISeat } from "../../interfaces/interfaces"
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
//import { seatList } from "../../seedData/seats"
import { useContext } from 'react'
import { LiveEventContext } from "../../context/context"
import SeatComponent from "./SeatComponent";

const Seats = ({ update }: { update: (param: ISeat) => void }) => {
    const data = useContext(LiveEventContext);
    const { sortedStructInPlaySeats } = data as IAppLiveEventData;
    const { tierARowA, tierARowB, tierCLeft, tierCLeftCenter, tierCRight, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedStructInPlaySeats;

    const handleClick = (seatData: ISeat) => {
        update(seatData)
    }

    return (
        <g className="seats">
            {
                (tierARowA && tierARowB) &&
                <g data-component="svg__block" data-section-name="TierA" data-section-id="s_57" className="section" transform="">
                    {
                        tierARowA &&
                        <g data-component="svg__row" data-row-name="A" className="row">
                            {
                                tierARowA.map((seat, index) => {
                                    if (seat.inPlay) {
                                        const cx = "5600";
                                        const cy = (2580 + 45 * index).toString();

                                        return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
                                    }
                                })
                            }
                        </g>
                    }
                    {
                        tierARowB &&
                        <g data-component="svg__row" data-row-name="B" className="row">
                            {
                                tierARowB.map((seat, index) => {
                                    const cx = "5680";
                                    const cy = (2580 + 45 * index).toString();

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
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
                                tierCRight.map((seat, index) => {
                                    const cx = index < 3 ? (7325 + 45 * index).toString() : "7445"
                                    const cy = index < 3 ? (2225 + 60 * index).toString() : (2225 + 70 * index).toString()

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCRightCenter &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRightCenter.map((seat, index) => {
                                    const cx = "7445";
                                    const cy = (2745 + 70 * index).toString();

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCLeftCenter &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCLeftCenter.map((seat, index) => {
                                    const cx = "7445";
                                    const cy = (3880 + 70 * index).toString();

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCLeft &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCLeft.map((seat, index) => {
                                    const cx = index <= 5 ? "7445" : (7625 - 35 * index).toString();
                                    const cy = index < 5 ? (4965 + 70 * index).toString() :
                                        index === 5 ? "5315" : (5100 + 45 * index).toString()

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
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
                                secondRightWing.map((seat, index) => {
                                    const cx = (6400 + 40 * index).toString();
                                    const cy = (2200 + 60 * index).toString();

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
                                })
                            }
                        </g>
                    }
                    {
                        secondLeftWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                secondLeftWing.map((seat, index) => {
                                    const cx = (6525 - 38 * index).toString();
                                    const cy = (5300 + 55 * index).toString();

                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
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
                                thirdRightWing.map((seat, index) => {
                                    const cx = (8050 + 42 * index).toString()
                                    const cy = (2275 + 62 * index).toString()
                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
                                })
                            }
                        </g>
                    }
                    {
                        thirdLeftWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                thirdLeftWing.map((seat, index) => {
                                    const cx = (8175 - 40 * index).toString()
                                    const cy = (5200 + 60 * index).toString()
                                    return <SeatComponent key={seat._id} seatData={seat} cx={cx} cy={cy} seatSelected={!seat.available} handleClick={() => handleClick(seat)} />
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