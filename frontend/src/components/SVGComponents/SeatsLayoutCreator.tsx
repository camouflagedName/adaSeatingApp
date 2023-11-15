import { IAppData } from "../../utils/interfaces"
//import { seatList } from "../../seedData/seats"
import { useContext } from 'react'
import { DataContext } from "../../context/context"
import SeatCreator from "./SeatCreator"
import { ISeatMeta } from "../../utils/creatorInterfaces"

const SeatsLayoutCreator = ({ seatMeta, updateMeta }: { seatMeta: ISeatMeta, updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>> }) => {
    const data = useContext(DataContext);
    const { sortedSeatData } = data as IAppData;
    const { tierARowA, tierARowB, tierCLeft, tierCRight, tierCLeftCenter, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;

    // include seats that aren't in play //

    return (
        <g className="seats">
            {
                (sortedSeatData.tierARowA || sortedSeatData.tierARowB) &&
                <g data-component="svg__block" data-section-name="TierA" data-section-id="s_57" className="section" transform="">
                    {
                        tierARowA &&
                        <g data-component="svg__row" data-row-name="A" className="row">
                            {
                                sortedSeatData.tierARowA .map((seat, index) => <SeatCreator seatData={seat} cx="5600" cy={(2580 + 45 * index).toString()} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />)
                            }
                        </g>
                    }
                    {
                        tierARowB &&
                        <g data-component="svg__row" data-row-name="B" className="row">
                            {
                                tierARowB.map((seat, index) => <SeatCreator seatData={seat} cx="5680" cy={(2580 + 45 * index).toString()} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />)
                            }
                        </g>
                    }
                </g>
            }
            {
                (tierCLeft || tierCRight || tierCLeftCenter || tierCRightCenter) &&
                <g data-component="svg__block" data-section-name="TierC" data-section-id="s_57" className="section" transform="">
                    {
                        tierCRight &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRight.map((seat, index) => {
                                    const cx = index < 3 ? (7325 + 45 * index).toString() : "7445"
                                    const cy = index < 3 ? (2225 + 60 * index).toString() : (2225 + 70 * index).toString()
                                    return <SeatCreator seatData={seat} cx={cx} cy={cy} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />
                                    
                                })
                            }
                        </g>
                    }
                    {
                        tierCRightCenter &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRightCenter.map((seat, index) => {

                                    const cy = (2745 + 70 * index).toString()
                                    return  <SeatCreator seatData={seat} cx="7445" cy={cy} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />
                                })
                            }
                        </g>
                    }
                    {
                        tierCLeftCenter &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCLeftCenter.map((seat, index) => {
                                    const cy = (3880 + 70 * index).toString()
                                    return <SeatCreator seatData={seat} cx="7445" cy={cy} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />
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

                                    return  <SeatCreator seatData={seat} cx={cx} cy={cy} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />
                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                (secondLeftWing || secondRightWing) &&
                <g data-component="svg__block" data-section-name="secondFloorWings" data-section-id="s_57" className="section" transform="">
                    {
                        secondRightWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                secondRightWing.map((seat, index) => {
                                    const cx = (6400 + 40 * index).toString()
                                    const cy = (2200 + 60 * index).toString()
                                    return <SeatCreator seatData={seat} cx={cx} cy={cy} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />
                                })
                            }
                        </g>
                    }
                    {
                        secondLeftWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                secondLeftWing.map((seat, index) => {
                                    const cx = (6525 - 38 * index).toString()
                                    const cy = (5300 + 55 * index).toString()
                                    return <SeatCreator seatData={seat} cx={cx} cy={cy} isSelected={seatMeta[seat._id].isSelected} updateMeta={updateMeta} />
                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                (thirdLeftWing || thirdRightWing) &&
                <g data-component="svg__block" data-section-name="thirdFloorWings" data-section-id="s_57" className="section" transform="">
                    {

                    }
                </g>
            }
        </g>
    )
}

export default SeatsLayoutCreator;