import { ISeat, IAppData } from "../../interfaces/interfaces"
//import { seatList } from "../../seedData/seats"
import { useContext } from 'react'
import { DataContext } from "../../context/context"

const Seats = ({ update }: { update: (param: ISeat) => void }) => {
    const data = useContext(DataContext);
    const { seatData } = data as IAppData;

    // include seats that aren't in play //

    /* TIER A */
    const tierAMap = seatData.filter(seatObj => seatObj.section === "TierA")
    const tierARowA = tierAMap.filter(seatObj => seatObj.row === "A")
    const tierARowB = tierAMap.filter(seatObj => seatObj.row === "B")



    /* TIER C */
    const tierCMap = seatData.filter(seatObj => seatObj.section === "TierC")
    const tierCRight = tierCMap.filter(seatObj => seatObj.seatNumber <= 106)
    const tierCRCtr = tierCMap.filter(seatObj => seatObj.seatNumber > 106 && seatObj.seatNumber <= 122)
    const tierCLCtr = tierCMap.filter(seatObj => seatObj.seatNumber > 122 && seatObj.seatNumber <= 137)
    const tierCLeft = tierCMap.filter(seatObj => seatObj.seatNumber > 137)

    /* 2nd FlOOR WINGS */
    const secondFloorWingMap = seatData.filter(seatObj => seatObj.floor === 2 && (seatObj.section === "2ndFloorLeftWing" || seatObj.section === "2ndFloorRightWing"))
    const secondRightWing = secondFloorWingMap.filter(seatObj => seatObj.section === "2ndFloorRightWing")
    const secondLeftWing = secondFloorWingMap.filter(seatObj => seatObj.section === "2ndFloorLeftWing")

    /* 3rd FLOOR WINGS */
    const thirdFloorWingMap = seatData.filter(seatObj => seatObj.floor === 3 && (seatObj.section === "3rdFloorLeftWing" || seatObj.section === "3rdFloorRightWing"))
    //const thirdRightWing = thirdFloorWingMap.filter(seatObj => seatObj.section === "RightWing")
    //const thirdLeftWing = thirdFloorWingMap.filter(seatObj => seatObj.section === "LeftWing")

    const handleClick = (seatData: ISeat) => {
        update(seatData)
    }

    return (
        <g className="seats">
            {
                tierAMap &&
                <g data-component="svg__block" data-section-name="TierA" data-section-id="s_57" className="section" transform="">
                    {
                        tierARowA &&
                        <g data-component="svg__row" data-row-name="A" className="row">
                            {
                                tierARowA.map((seat, index) => {
                                    if (seat.inPlay) {
                                        return (
                                            <circle
                                                data-component="svg__seat"
                                                id={seat._id}
                                                className="seat"
                                                data-seat-name={seat.seatNumber.toString()}
                                                cx="5600"
                                                cy={(2580 + 45 * index).toString()}
                                                r="18"
                                                onClick={() => handleClick(seat)}
                                            >
                                            </circle>
                                        )
                                    }
                                })
                            }
                        </g>
                    }
                    {
                        tierARowB &&
                        <g data-component="svg__row" data-row-name="B" className="row">
                            {
                                tierARowB.map((seat, index) => (
                                    <circle
                                        data-component="svg__seat"
                                        id={seat._id}
                                        className="seat"
                                        data-seat-name={seat.seatNumber.toString()}
                                        cx="5680"
                                        cy={(2580 + 45 * index).toString()}
                                        r="18"
                                        onClick={() => handleClick(seat)}
                                    >
                                    </circle>
                                ))
                            }
                        </g>
                    }
                </g>
            }
            {
                tierCMap &&
                <g data-component="svg__block" data-section-name="TierC" data-section-id="s_57" className="section" transform="">
                    {
                        tierCRight &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRight.map((seat, index) => {
                                    const cx = index < 3 ? (7325 + 45 * index).toString() : "7445"
                                    const cy = index < 3 ? (2225 + 60 * index).toString() : (2225 + 70 * index).toString()
                                    return (
                                        <circle
                                            data-component="svg__seat"
                                            id={seat._id}
                                            className="seat"
                                            data-seat-name={seat.seatNumber.toString()}
                                            cx={cx}
                                            cy={cy}
                                            r="18"
                                            onClick={() => handleClick(seat)}
                                        >
                                        </circle>
                                    )
                                })
                            }
                        </g>
                    }
                    {
                        tierCRCtr &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCRCtr.map((seat, index) => {

                                    const cy = (2745 + 70 * index).toString()
                                    return (
                                        <circle
                                            data-component="svg__seat"
                                            id={seat._id}
                                            className="seat"
                                            data-seat-name={seat.seatNumber.toString()}
                                            cx="7445"
                                            cy={cy}
                                            r="18"
                                            onClick={() => handleClick(seat)}
                                        >
                                        </circle>
                                    )
                                })
                            }
                        </g>
                    }
                    {
                        tierCLCtr &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                tierCLCtr.map((seat, index) => {

                                    const cy = (3880 + 70 * index).toString()
                                    return (
                                        <circle
                                            data-component="svg__seat"
                                            id={seat._id}
                                            className="seat"
                                            data-seat-name={seat.seatNumber.toString()}
                                            cx="7445"
                                            cy={cy}
                                            r="18"
                                            onClick={() => handleClick(seat)}
                                        >
                                        </circle>
                                    )
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

                                    return (
                                        <circle
                                            data-component="svg__seat"
                                            id={seat._id}
                                            className="seat"
                                            data-seat-name={seat.seatNumber.toString()}
                                            cx={cx}
                                            cy={cy}
                                            r="18"
                                            onClick={() => handleClick(seat)}
                                        >
                                        </circle>
                                    )
                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                secondFloorWingMap &&
                <g data-component="svg__block" data-section-name="secondFloorWings" data-section-id="s_57" className="section" transform="">
                    {
                        secondRightWing &&
                        <g data-component="svg__row" data-row-name="F" className="row">
                            {
                                secondRightWing.map((seat, index) => {
                                    const cx = (6400 + 40 * index).toString()
                                    const cy = (2200 + 60 * index).toString()
                                    return (
                                        <circle
                                            data-component="svg__seat"
                                            id={seat._id}
                                            className="seat"
                                            data-seat-name={seat.seatNumber.toString()}
                                            cx={cx}
                                            cy={cy}
                                            r="18"
                                            onClick={() => handleClick(seat)}
                                        >
                                        </circle>
                                    )
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
                                    return (
                                        <circle
                                            data-component="svg__seat"
                                            id={seat._id}
                                            className="seat"
                                            data-seat-name={seat.seatNumber.toString()}
                                            cx={cx}
                                            cy={cy}
                                            r="18"
                                            onClick={() => handleClick(seat)}
                                        >
                                        </circle>
                                    )
                                })
                            }
                        </g>
                    }
                </g>
            }
            {
                thirdFloorWingMap &&
                <g data-component="svg__block" data-section-name="thirdFloorWings" data-section-id="s_57" className="section" transform="">
                    {

                    }
                </g>
            }
        </g>
    )
}

export default Seats;