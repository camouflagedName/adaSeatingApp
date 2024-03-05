import { useState, useRef, useEffect } from "react";
import Seats from "./SeatsSVG";
import { Center, Flex, useDisclosure } from "@chakra-ui/react";
import SVGLayout from "./SVGLayout";
import InteractiveSection from "./InteractiveSection";
import withLiveEventSectionLogic from "./withLiveEventMapSVGLogic";
import { IMapLocation, ViewBox } from "../../interfaces/liveEventInterfaces";
import ToolTip from "./ToolTip";

interface IFwdRefObj {
    a: React.MutableRefObject<SVGPathElement | null>;
    c: React.MutableRefObject<SVGPathElement | null>;
    sFlR: React.MutableRefObject<SVGPathElement | null>;
    sFlL: React.MutableRefObject<SVGPathElement | null>;
    tFlR: React.MutableRefObject<SVGPathElement | null>;
    tFlL: React.MutableRefObject<SVGPathElement | null>;
}

interface PassedProps {
    zoomOut: boolean;
    height: number;
    fwdRefObj: IFwdRefObj;
    mapLocation: IMapLocation;
}

interface ToolTipData {
    cx: string;
    cy: string;
    patronID: string;
}

const baseViewBox: ViewBox = {
    minX: 0,
    minY: 0,
    width: 10240,
    height: 7680,
}

const InteractiveSectionLiveEvent = withLiveEventSectionLogic(InteractiveSection);

const MapSVG = ({
    zoomOut,
    height,
    fwdRefObj,
    mapLocation,
}: PassedProps) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState(baseViewBox);
    const [toolTipData, setToolTipData] = useState<ToolTipData>({
        cx: "",
        cy: "",
        patronID: "",
    })

    const svgRef = useRef<SVGSVGElement | null>(null);

    const mapDimensions = {
        width: 1024,
        height: height || 750
    }

    const updateSVGState = (zoomAmount: number, viewBoxData: ViewBox) => {
        setZoom(zoomAmount)
        setViewBox(viewBoxData);
    }

    const handleToolTipData = (data?: ToolTipData) => {
        if (data) setToolTipData(data);
        else setToolTipData({
            cx: "",
            cy: "",
            patronID: "",
        })
    }

    useEffect(() => {
        if (zoomOut) {
            setZoom(1)
            setViewBox({
                minX: 0,
                minY: 0,
                width: 10240,
                height: 7680,
            });
        }
    }, [zoomOut])

    useEffect(() => {
        if (mapLocation.zoomIn) updateSVGState(mapLocation.zoomAmt, mapLocation.viewBox)
    }, [mapLocation.zoomIn, mapLocation.zoomAmt, mapLocation.viewBox])

    const tierA = (
        <g id="TIER_A">
            <InteractiveSectionLiveEvent
                id="TIERAR"
                zoom={zoom}
                updateSVGState={updateSVGState}
                parentSVGRef={svgRef}
                forwardRef={fwdRefObj.a}
                dString="M5560.9,2523.4L5560.9,3450.769263474873L6102.3007883244145,3450.769263474873L6102.3007883244145,3212.1162880253028L6333.396730540437,3212.1162880253028L6333.396730540437,2523.4z" />
        </g>
    );

    //TODO: fix from InteractiveSection to InteractiveSectionLiveEvent ??

    const tierC = (
        <g id="TIER_C">
            <path
                ref={fwdRefObj.c}
                fill="#ffffff"
                d="M7367.75,2696.5L7367.75,3839.8L7825.27,3839.8L7825.27,2696.5z
                M7367.54537507307,4929.8L7825.145375073071,4929.85L7597.41,5748.223124634648L7205.8,5490.003124634648L7367.77,5244.373124634648L7367.54537507307,4929.8z
                M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z
                M7367.75,3840.8L7367.89537507307,4929.645375073071L7825.0953750730705,4929.645375073071L7825.27,3840.8z"
                style={{ pointerEvents: 'none' }}
            />
            <InteractiveSection
                id="TCRCT"
                zoom={zoom}
                updateSVGState={updateSVGState}
                parentSVGRef={svgRef}
                dString="M7367.75,2696.5L7367.75,3839.8L7825.27,3839.8L7825.27,2696.5z" />
            <InteractiveSection id="TRCLFT"
                zoom={zoom}
                updateSVGState={updateSVGState}
                parentSVGRef={svgRef}
                dString="M7367.54537507307,4929.8L7367.77,5244.373124634648L7205.8,5490.003124634648L7597.41,5748.223124634648L7825.290000000001,5402.643124634648L7825.145375073071,4929.85z" />
            <InteractiveSection id="TRCRHT"
                zoom={zoom}
                updateSVGState={updateSVGState}
                parentSVGRef={svgRef}
                dString="M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z" />
            <InteractiveSection id="TRCLCR"
                zoom={zoom}
                updateSVGState={updateSVGState}
                parentSVGRef={svgRef}
                dString="M7367.75,3840.8L7367.89537507307,4929.645375073071L7825.0953750730705,4929.645375073071L7825.27,3840.8z" />

        </g>
    );

    const secondFloorWings = (
        <g id="2nd_Floor_Wings">
            <g id="2nd_Floor_Right_Wing">
                <InteractiveSection
                    id="2FRTWG"
                    zoom={zoom}
                    updateSVGState={updateSVGState}
                    forwardRef={fwdRefObj.sFlR}
                    parentSVGRef={svgRef}
                    dString="M6433.55,2140.05L6274,2245.3232223894956L6430.336777610506,2481.1067776105047L6589.599999999999,2376.75z" />
            </g>
            <g id="2nd_Floor_Left_Wing">
                <InteractiveSection
                    id="2FLTWG"
                    zoom={zoom}
                    updateSVGState={updateSVGState}
                    forwardRef={fwdRefObj.sFlL}
                    parentSVGRef={svgRef}
                    dString="M6433.57,5191.85L6278.9,5425.590000000001L6433.473222389495,5530.973222389495L6589.623222389495,5294.2732223894955z" />
            </g>
        </g>
    );

    const thirdFloorWings = (
        <g id="3rd_Floor_Wings">
            <g id="3rd_Floor_Left_Wing">
                <InteractiveSection
                    id="3FLWG"
                    zoom={zoom}
                    updateSVGState={updateSVGState}
                    forwardRef={fwdRefObj.tFlL}
                    parentSVGRef={svgRef}
                    dString="M8088.273222389496,5099.75L7918.05,5360L8077.373222389496,5465.1L8247.923222389496,5205.073222389496z" />
            </g>
            <g id="3rd_Floor_Right_Wing">
                <InteractiveSection
                    id="3FRTWG"
                    zoom={zoom}
                    updateSVGState={updateSVGState}
                    forwardRef={fwdRefObj.tFlR}
                    parentSVGRef={svgRef}
                    dString="M8082.35,2213.05L7918,2317.1232223894954L8089.373222389495,2578.9232223894955L8250.923222389496,2472.5732223894956z" />
            </g>
        </g>
    );

    return (
        <Flex style={{ background: "rgb(232, 236, 242)", justifyContent: "center", maxHeight: "100%", overflow: "auto" }}>
            <Center style={{ maxHeight: "100vh" }}>
                {(toolTipData.cx.length > 0 || toolTipData.cy.length > 0) &&
                    < ToolTip
                        toolTipData={toolTipData}
                        isOpen={isOpen}
                        onClose={onClose} />
                }
                <svg
                    version="1.1"
                    viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
                    x="0px"
                    y="0px"
                    width={mapDimensions.width}
                    height={mapDimensions.height}
                    style={{ maxWidth: "100%", minWidth: "100%", minHeight: "100%" }}
                    xmlns="http://www.w3.org/2000/svg"
                    ref={svgRef}>
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

                    <SVGLayout
                        tierA={tierA}
                        tierC={tierC}
                        secondFloorWings={secondFloorWings}
                        thirdFloorWings={thirdFloorWings} />
                    <Seats
                        zoom={zoom}
                        onToggle={onToggle}
                        handleToolTipData={handleToolTipData}
                        isOpen={isOpen}
                        svgHeight={height}
                    />
                </svg>
            </Center>
        </Flex>
    )
}

export default MapSVG;