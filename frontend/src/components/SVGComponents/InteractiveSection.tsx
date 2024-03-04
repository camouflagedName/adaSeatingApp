import { FC, MutableRefObject, useRef, useState } from "react";
import { ViewBox } from "../../interfaces/liveEventInterfaces";
import calculateNewViewBox from "../../utils/calculateNewViewBox";


interface PassedProps {
    id: string;
    dString: string;
    zoom: number;
    parentSVGRef: MutableRefObject<SVGSVGElement | null>;
    forwardRef?: MutableRefObject<SVGPathElement | null>;
    updateSVGState: (zoomAmount: number, viewBoxData: ViewBox) => void;
}


const baseViewBox: ViewBox = {
    minX: 0,
    minY: 0,
    width: 10240,
    height: 7680,
}

const InteractiveSection: FC<PassedProps> = ({
    id,
    updateSVGState,
    parentSVGRef,
    dString,
    zoom,
    forwardRef
}) => {
    //const data = useContext(LiveEventContext);
    //const { sortedInPlaySeats } = data as IAppLiveEventData;
    const [border, setBorder] = useState({
        color: "#dddddd",
        width: "10",
    });

    const pathRef = useRef<SVGPathElement | null>(null);

    const handleMouseOver = () => {
        setBorder({
            color: "#a4d4ff",
            width: "30",
        })
    }

    const handleMouseLeave = () => {
        setBorder({
            color: "#dddddd",
            width: "10",
        })
    }

    const handleClick = (event: React.MouseEvent<SVGElement>) => {
        const svgRefCurrent = parentSVGRef.current;
        const pathRefCurrent = forwardRef ? forwardRef.current : pathRef.current;
        let zoomFactor = 1;
        let updatedViewBox = baseViewBox;
        
        if (zoom < 3) {
            zoomFactor = zoom + 1;

            if (pathRefCurrent && svgRefCurrent)
                updatedViewBox = calculateNewViewBox(pathRefCurrent, zoomFactor)

            if (event.currentTarget.parentElement) {
                //const sectionTitleArray = event.currentTarget.parentElement.id.split("_");
                //const sectionTitleNoSpaces = sectionTitleArray.join("");
                //const filteredData = sortedInPlaySeats.filter(seat => seat.section.toLowerCase() === sectionTitleNoSpaces.toLowerCase());

                //navTitle = sectionTitleArray.join(" ");
                //seats = seatSorter(filteredData, "array") as ISeat[];
            }
        }

        //updateNavData(navTitle, seats);
        updateSVGState(zoomFactor, updatedViewBox);
    }

    return (
        <path
            ref={forwardRef || pathRef}
            id={id}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            fill="#ffffff"
            stroke={border.color}
            strokeWidth={border.width}
            d={dString}
        />
    )
};

export default InteractiveSection;