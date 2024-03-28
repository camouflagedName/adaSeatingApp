import { FC, MutableRefObject, useRef, useState } from "react";

interface PassedProps {
    id: string;
    dString: string;
    forwardRef?: MutableRefObject<SVGPathElement | null>;
    toggleTooltip?: () => void;
    tooltipIsOpen?: boolean;
}

const InteractiveSection: FC<PassedProps> = ({
    id,
    dString,
    forwardRef,
    toggleTooltip,
    tooltipIsOpen
}) => {
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

    const handleClick = () => {
        if (tooltipIsOpen && toggleTooltip) toggleTooltip();
    }

    return (
        <path
            ref={forwardRef || pathRef}
            id={id}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onTouchStart={handleClick}
            fill="#ffffff"
            stroke={border.color}
            strokeWidth={border.width}
            d={dString}
        />
    )
};

export default InteractiveSection;

/* 

    const old_handleClick = (event: React.MouseEvent<SVGElement>) => {
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

*/