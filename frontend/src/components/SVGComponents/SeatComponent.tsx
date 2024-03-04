//import { useContext, useEffect, useState } from "react";
//import { ISeat } from "../../interfaces/interfaces";
//import { LiveEventContext } from "../../context/context"
//import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";

import { useEffect, useRef, useState } from "react";

interface SeatComponentProps {
    seatID: string;
    cx: string;
    cy: string;
    seatColor: string;
    handleClick: (param: SVGCircleElement | undefined) => void;
}

const SeatComponent: React.FC<SeatComponentProps> = (
    {
        seatID,
        cx,
        cy,
        seatColor,
        handleClick
    }: SeatComponentProps
) => {
    const [svgElement, setSVGElement] = useState<SVGCircleElement>();
    const seatRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        if (seatRef && seatRef.current) setSVGElement(seatRef.current);
    }, [seatRef])

    return (
        <circle
            ref={seatRef}
            data-component="svg__seat"
            id={seatID}
            className="seat"
            cx={cx}
            cy={cy}
            r="18"
            onClick={() => handleClick(svgElement)}
            style={{ fill: `${seatColor}`}}
        >
        </circle>
    )
}


export default SeatComponent;