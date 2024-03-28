import { MutableRefObject, useContext } from "react";
import { LiveEventContext } from "../../context/context";
import { ISeat } from "../../interfaces/interfaces";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
import seatSorter from "../../utils/seatSorter";

interface ViewBox {
    minX: number;
    minY: number;
    width: number;
    height: number;
}

interface MapSVGComponentProps {
    id: string;
    dString: string;
    zoom: number;
    parentSVGRef: MutableRefObject<SVGSVGElement | null>;
    forwardRef?: MutableRefObject<SVGPathElement | null>;
    updateSVGState: (zoomAmount: number, viewBoxData: ViewBox) => void;
    toggleTooltip?: () => void;
    tooltipIsOpen?: boolean;
}

interface ForwardedProps extends MapSVGComponentProps {
    updateNavData: (event: React.MouseEvent<SVGElement>, zoom: number) => void;
}

const withLiveEventSectionLogic = (WrappedComponent: React.ComponentType<ForwardedProps>) => {

    const MapSVGComponent: React.FC<MapSVGComponentProps> = (props) => {
        const data = useContext(LiveEventContext);
        const { sortedInPlaySeats, updateNavTitle, updateSideBarNav } = data as IAppLiveEventData;

        const updateNavData = (event: React.MouseEvent<SVGElement>, zoom: number) => {
            let navTitle = "ALL SEATS";
            let seats: ISeat[] = [];
            if (zoom < 3) {
                if (event.currentTarget.parentElement) {
                    const sectionTitleArray = event.currentTarget.parentElement.id.split("_");
                    const sectionTitleNoSpaces = sectionTitleArray.join("");
                    const filteredData = sortedInPlaySeats.filter(seat => seat.section.toLowerCase() === sectionTitleNoSpaces.toLowerCase());

                    navTitle = sectionTitleArray.join(" ");
                    seats = seatSorter(filteredData, "array") as ISeat[];
                }
            }

            updateNavTitle(navTitle);
            if (seats.length > 0) updateSideBarNav(seats);
            else updateSideBarNav();
        }

        return (
            <WrappedComponent
                {...props as MapSVGComponentProps}
                updateNavData={updateNavData}
            />
        )
    }

    return MapSVGComponent;
}

export default withLiveEventSectionLogic;