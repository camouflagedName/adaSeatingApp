import { ISeat } from "../interfaces/interfaces";


const seatSorter = (seatData: ISeat[], returnType: string = "") => {

    /* TIER A */
    const tierAMap = seatData.filter(seatObj => seatObj.section === "TierA")
    const sortedTierARowA = tierAMap.filter(seatObj => seatObj.row === "A").sort((a, b) => a.seatNumber - b.seatNumber)
    const sortedTierARowB = tierAMap.filter(seatObj => seatObj.row === "B").sort((a, b) => a.seatNumber - b.seatNumber)

    /* TIER C */
    const sortedTierCMap = seatData.filter(seatObj => seatObj.section === "TierC").sort((a, b) => a.seatNumber - b.seatNumber)
    const tierCRight = sortedTierCMap.filter(seatObj => seatObj.seatNumber <= 106)
    const tierCRCtr = sortedTierCMap.filter(seatObj => seatObj.seatNumber > 106 && seatObj.seatNumber <= 122)
    const tierCLCtr = sortedTierCMap.filter(seatObj => seatObj.seatNumber > 122 && seatObj.seatNumber <= 137)
    const tierCLeft = sortedTierCMap.filter(seatObj => seatObj.seatNumber > 137)


    /* 2nd FlOOR WINGS */
    const secondFloorWingMap = seatData.filter(seatObj => seatObj.floor === 2 && (seatObj.section === "2ndFloorLeftWing" || seatObj.section === "2ndFloorRightWing"))
    const sortedSecondRightWing = secondFloorWingMap.filter(seatObj => seatObj.section === "2ndFloorRightWing").sort((a, b) => a.seatNumber - b.seatNumber)
    const sortedSecondLeftWing = secondFloorWingMap.filter(seatObj => seatObj.section === "2ndFloorLeftWing").sort((a, b) => a.seatNumber - b.seatNumber)

    /* 3rd FLOOR WINGS */
    const thirdFloorWingMap = seatData.filter(seatObj => seatObj.floor === 3 && (seatObj.section === "3rdFloorLeftWing" || seatObj.section === "3rdFloorRightWing"))
    const sortedThirdRightWing = thirdFloorWingMap.filter(seatObj => seatObj.section === "3rdFloorRightWing").sort((a, b) => a.seatNumber - b.seatNumber)
    const sortedThirdLeftWing = thirdFloorWingMap.filter(seatObj => seatObj.section === "3rdFloorLeftWing").sort((a, b) => a.seatNumber - b.seatNumber)

    if (returnType === "array") return (
        [
            ...sortedTierARowA,
            ...sortedTierARowB,
            ...sortedTierCMap,
            ...sortedSecondRightWing,
            ...sortedSecondLeftWing,
            ...sortedThirdRightWing,
            ...sortedThirdLeftWing
        ]
    );


    return {
        tierARowA: sortedTierARowA,
        tierARowB: sortedTierARowB,
        tierCRight: tierCRight,
        tierCLeft: tierCLeft,
        tierCLeftCenter: tierCLCtr,
        tierCRightCenter: tierCRCtr,
        secondRightWing: sortedSecondRightWing,
        secondLeftWing: sortedSecondLeftWing,
        thirdRightWing: sortedThirdRightWing,
        thirdLeftWing: sortedThirdLeftWing
    }

}

export default seatSorter;