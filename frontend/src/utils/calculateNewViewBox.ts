import { ViewBox } from "../interfaces/liveEventInterfaces";

const calculateNewViewBox = (pathElement: SVGPathElement, zoomFactor: number): ViewBox => {
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

export default calculateNewViewBox;