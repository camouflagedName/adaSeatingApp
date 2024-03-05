import { useEffect } from "react";
import calculateNewViewBox from "../utils/calculateNewViewBox";
import { IMapLocation, ViewBox } from "../interfaces/liveEventInterfaces";

type refObjectArray = (React.MutableRefObject<SVGPathElement | null> | null)[]

const baseViewBox: ViewBox = {
    minX: 0,
    minY: 0,
    width: 10240,
    height: 7680,
}

const useMapLocation = ({ navHeaderIndex, refs, setMapLocation }: { navHeaderIndex: number, refs: refObjectArray, setMapLocation: (value: React.SetStateAction<IMapLocation>) => void }) => {

    useEffect(() => {
        console.log("useMapLocation useEffect triggered");
        //const refVal: refObject[] = Object.values(fwdRefObj);
        //const refs = [...refVal, null];
        const ref = refs[navHeaderIndex]
        console.log("Ref:", ref);

        if (ref && ref.current) {
            const newViewBox = calculateNewViewBox(ref.current, 3.3)
            setMapLocation({
                zoomAmt: 3,
                zoomIn: true,
                viewBox: newViewBox,
            })
        } else {
            setMapLocation({
                zoomAmt: 3,
                zoomIn: true,
                viewBox: baseViewBox,
            })
        }

    }, [navHeaderIndex, refs, setMapLocation])
}

export default useMapLocation;