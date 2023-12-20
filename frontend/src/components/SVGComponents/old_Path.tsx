import { useState } from "react";


const Path = ({ id, handleZoom, dString }: { id: string, handleZoom: (event: React.MouseEvent<SVGElement>) => void, dString: string }) => {
    const [border, setBorder] = useState({
        color: "#dddddd",
        width: "10",
    });

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

        handleZoom(event);
    }

    return (
        <path
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
}

export default Path;