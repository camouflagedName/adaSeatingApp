import { FC, MutableRefObject, useRef, useState } from "react";
//import { ISeat } from "../../interfaces/interfaces";
//import seatSorter from "../../utils/seatSorter";
//import { LiveEventContext } from "../../context/context";
//import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";

interface PassedProps {
    id: string;
    dString: string;
    zoom: number;
    parentSVGRef: MutableRefObject<SVGSVGElement | null>;

    updateSVGState: (zoomAmount: number, viewBoxData: ViewBox) => void;
}

interface ViewBox {
    minX: number;
    minY: number;
    width: number;
    height: number;
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
    zoom
}) => {
    //const data = useContext(LiveEventContext);
    //const { sortedInPlaySeats } = data as IAppLiveEventData;
    const [border, setBorder] = useState({
        color: "#dddddd",
        width: "10",
    });

    const pathRef = useRef(null);

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
        const pathRefCurrent = pathRef.current;
        let zoomFactor = 1;
        //let navTitle = "ALL SEATS";
        let updatedViewBox = baseViewBox;
        //let seats: ISeat[] = [];

        if (zoom < 3) {
            zoomFactor = zoom + 1;

            if (pathRefCurrent && svgRefCurrent) updatedViewBox = createNewViewBox(pathRefCurrent, zoomFactor)

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
            ref={pathRef}
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

const createNewViewBox = (pathElement: SVGPathElement, zoomFactor: number): ViewBox => {
    // Get the bounding box of the SVGPathElement
    const bbox = pathElement.getBBox();
    const padding = 1250 - (zoomFactor * 375); // Adjust this as needed for padding around the path

    // Calculate the new ViewBox values for zooming and centering
    const newViewBox: ViewBox = {
        minX: bbox.x - padding,
        minY: bbox.y - padding,
        width: bbox.width + 2 * padding,
        height: bbox.height + 2 * padding,
    };

    return newViewBox;
};