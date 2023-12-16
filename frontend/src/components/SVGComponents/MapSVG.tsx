import { useState, useRef, useContext, useEffect } from "react";
import Seats from "./SeatsSVG";
import { Center, Flex } from "@chakra-ui/react";
import { ISeat } from "../../interfaces/interfaces";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
import Path from "./Path";
import { LiveEventContext } from "../../context/context";
import SVGLayout from "./SVGLayout";
import seatSorter from "../../utils/seatSorter";


interface PassedProps {
    updateSideBarNav: (param?: ISeat | ISeat[]) => void;
    updateNavTitle: (title: string) => void;
    zoomOut: boolean;
}

const MapSVG = ({ updateSideBarNav, updateNavTitle, zoomOut }: PassedProps) => {
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState({
        minX: 0,
        minY: 0,
        width: 10240,
        height: 7680,
    });
    const data = useContext(LiveEventContext);
    const { sortedInPlaySeats } = data as IAppLiveEventData;
    const svgRef = useRef<SVGSVGElement | null>(null);
    const mapDimensions = {
        width: 1024,
        height: 750
    }

    const resetZoom = () => {
        console.log("USE CALLBACK")
        updateNavTitle("All SEATS");
        updateSideBarNav();
        setZoom(1)
        setViewBox({
            minX: 0,
            minY: 0,
            width: 10240,
            height: 7680,
        });
    }

    const handleZoom = (event: React.MouseEvent<SVGElement>) => {
        if (zoom < 3) {
            const zoomFactor = zoom + 1;
            //const svgCurrent = svgRef.current;
            if (svgRef.current) {
                const svgPoint = svgRef.current.createSVGPoint();
                svgPoint.x = event.clientX;
                svgPoint.y = event.clientY;
                const transPoint = svgPoint.matrixTransform(
                    svgRef.current.getScreenCTM()?.inverse()
                );

                const newViewBox = {
                    minX: transPoint.x - viewBox.width / (2 * zoomFactor),
                    minY: transPoint.y - viewBox.height / (2 * zoomFactor),
                    width: viewBox.width / zoomFactor,
                    height: viewBox.height / zoomFactor,
                }

                setViewBox(newViewBox);
                setZoom(zoomFactor);

                if (event.currentTarget.parentElement) {
                    const id = event.currentTarget.parentElement.id.split("_").join(" ")
                    const filteredID = event.currentTarget.parentElement.id.split("_").join("")
                    const filteredData = sortedInPlaySeats.filter(seat => {
                        return seat.section.toLowerCase() === filteredID.toLowerCase()
                    })

                    const sortedSeats: ISeat[] = seatSorter(filteredData, "array") as ISeat[];
                    updateSideBarNav(sortedSeats)
                    updateNavTitle(id)
                }

            }
        } else resetZoom();
    }



    useEffect(() => {
        if (zoomOut) {
            updateNavTitle("All SEATS");
            updateSideBarNav();
            setZoom(1)
            setViewBox({
                minX: 0,
                minY: 0,
                width: 10240,
                height: 7680,
            });
        }
    }, [zoomOut, updateNavTitle, updateSideBarNav])

    const tierA = (
        <g id="TIER_A">
            <Path id="TIERAR" handleZoom={handleZoom} dString="M5560.9,2523.4L5560.9,3450.769263474873L6102.3007883244145,3450.769263474873L6102.3007883244145,3212.1162880253028L6333.396730540437,3212.1162880253028L6333.396730540437,2523.4z" />
            <path id="TIERAL" fill="#ffffff" stroke="#dddddd" strokeWidth="10" d="M5560.9,4230.15L5560.9,5157.519263474873L6333.396730540437,5157.519263474873L6333.396730540437,4453.548963922594L6102.3007883244145,4453.548963922594L6102.3007883244145,4230.15z" />
        </g>

    )
    const tierC = (
        <g id="TIER_C">
            <Path id="TCRCT" handleZoom={handleZoom} dString="M7367.75,2696.5L7367.75,3839.8L7825.27,3839.8L7825.27,2696.5z" />
            <Path id="TRCLFT" handleZoom={handleZoom} dString="M7367.54537507307,4929.8L7367.77,5244.373124634648L7205.8,5490.003124634648L7597.41,5748.223124634648L7825.290000000001,5402.643124634648L7825.145375073071,4929.85z" />
            <Path id="TRCRHT" handleZoom={handleZoom} dString="M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z" />
            <Path id="TRCLCR" handleZoom={handleZoom} dString="M7367.75,3840.8L7367.89537507307,4929.645375073071L7825.0953750730705,4929.645375073071L7825.27,3840.8z" />
        </g>
    )
    const secondFloorWings = (
        <g id="2nd_Floor_Wings">
            <g id="2nd_Floor_Right_Wing">
                <Path id="2FRTWG" handleZoom={handleZoom} dString="M6433.55,2140.05L6274,2245.3232223894956L6430.336777610506,2481.1067776105047L6589.599999999999,2376.75z" />
            </g>
            <g id="2nd_Floor_Left_Wing">
                <Path id="2FLTWG" handleZoom={handleZoom} dString="M6433.57,5191.85L6278.9,5425.590000000001L6433.473222389495,5530.973222389495L6589.623222389495,5294.2732223894955z" />
            </g>
        </g>
    )

    const thirdFloorWings = (
        <g id="3rd_Floor_Wings">
            <g id="3rd_Floor_Left_Wing">
                <Path id="3FLWG" handleZoom={handleZoom} dString="M8088.273222389496,5099.75L7918.05,5360L8077.373222389496,5465.1L8247.923222389496,5205.073222389496z" />
            </g>
            <g id="3rd_Floor_Right_Wing">
                <Path id="3FRTWG" handleZoom={handleZoom} dString="M8082.35,2213.05L7918,2317.1232223894954L8089.373222389495,2578.9232223894955L8250.923222389496,2472.5732223894956z" />
            </g>
        </g>
    )

    return (
        <Flex style={{ background: "rgb(232, 236, 242)", justifyContent: "center", maxHeight: "100%", overflow: "auto" }}>
            <Center style={{ maxHeight: "100vh" }}>
                <svg
                    version="1.1"
                    viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
                    x="0px"
                    y="0px"
                    width={mapDimensions.width}
                    height={mapDimensions.height}
                    style={{ maxWidth: "100%", minWidth: "100%", minHeight: "100%" }}
                    xmlns="http://www.w3.org/2000/svg"
                    ref={svgRef}
                >
                    <defs>
                        <filter id="ISM_Shadow" filterUnits="objectBoundingBox">
                            <feGaussianBlur in="SourceAlpha" result="blur" stdDeviation="5" />
                            <feOffset dx="0" dy="0" in="blur" result="offsetBlurredAlpha" />
                            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="offsetBlurredAlpha" result="colorMatrix" />
                            <feMerge>
                                <feMergeNode in="colorMatrix" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <SVGLayout tierA={tierA} tierC={tierC} secondFloorWings={secondFloorWings} thirdFloorWings={thirdFloorWings} />
                    <Seats />
                </svg>
            </Center>
        </Flex>
    )
}



/*
const TierA = ({ children }: { children: React.ReactNode }) => (
    <g id="TIER_A">
        {children}
        <path id="TIERAL" fill="#ffffff" stroke="#dddddd" strokeWidth="10" d="M5560.9,4230.15L5560.9,5157.519263474873L6333.396730540437,5157.519263474873L6333.396730540437,4453.548963922594L6102.3007883244145,4453.548963922594L6102.3007883244145,4230.15z" />
    </g>
)

const TierC = ({ children }: { children: React.ReactNode }) => (
    <g id="TIER_C">
        {children}
    </g>
)

const SecondFloorWings = ({ children }: { children: React.ReactNode }) => (
    <g id="2nd_Floor_Wings">
        {children}
    </g>
)

const ThirdFloorWings = ({ children }: { children: React.ReactNode }) => (
    <g id="3rd_Floor_Wings">
        {children}
    </g>
)
*/
export default MapSVG;