import { useDisclosure } from "@chakra-ui/react"
import { IAppData, IPatronData, ISeat, ISortedSeatMap } from "../../interfaces/interfaces";
import { useState, useContext, useMemo, useEffect, useRef } from "react";
import SeatDataModal from "../SeatDataModal";
import SeatingMapLayout from "../SeatingMapLayout";
import MapNav from "../MapNav";
import MapSVG from "../SVGComponents/MapSVG";
import SeatingMapTitle from "../SeatingMapTitle";
import { DataContext } from "../../context/context";
import { LiveEventContext } from '../../context/context';
import seatSorter from "../../utils/seatSorter";
import mapper from "../../utils/mapper";
import dataUpdater from "../../utils/dataUpdater";
import { addPatronAPI, getPatrons, updatePatronAPI } from "../../api/patronAPI";
import { updateSeat } from "../../api/seatAPI";
import { getEventSeats } from "../../api/seatAPI";
import { IMapLocation, ViewBox } from "../../interfaces/liveEventInterfaces";
import useSocket from "../../hooks/useSocket";
import calculateNewViewBox from "../../utils/calculateNewViewBox";

//TODO: sidebar needs to be renamed to seatList or something else


const baseViewBox: ViewBox = {
    minX: 0,
    minY: 0,
    width: 10240,
    height: 7680,
}

//TEST: make sure it syncs with database
//TODO: check for occupied seats

const SeatingMapManager = ({ changePage, inPlaySeatIDs, eventID, eventsLoaded }: { changePage: (param: React.ReactElement) => void, inPlaySeatIDs: string[], eventID: string, eventsLoaded: boolean }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(DataContext);
    const { seatData } = contextData as IAppData;
    const inPlaySeats = seatData.filter(seat => inPlaySeatIDs.includes(seat._id))
    const seatDataMap = useMemo(() => mapper(inPlaySeats) as Map<string, ISeat>, [inPlaySeats]);

    /*     
    const sortedInPlaySeats = useMemo(() => {
        const inPlaySeats = seatData.filter(seat => inPlaySeatIDs.includes(seat._id));
        return seatSorter(inPlaySeats, "array") as ISeat[];
      }, [seatData, inPlaySeatIDs]);
       */

    const [modalData, setModalData] = useState<ISeat>();
    //const [navTitle, setNavTitle] = useState('ALL SEATS');
    const [patronData, updatePatrons] = useState<IPatronData[]>([]);
    const [patronDataMap, setPatronDataMap] = useState<Map<string, IPatronData>>();
    const [sessionSeats, updateSessionSeats] = useState<ISeat[]>([]);
    const sortedInPlaySeats = seatSorter(sessionSeats, "array") as ISeat[];
    const sortedStructInPlaySeats = seatSorter(sessionSeats) as ISortedSeatMap;

    //TODO: this needs to be handled different so that it only updates when a seat is clicked on
    const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
    const [zoomOut, setZoomOut] = useState(false);
    const [layoutMainHeight, setLayoutMainHeight] = useState(0);
    const [navHeaderIndex, setNavHeaderIndex] = useState(6);
    const [mapLocation, setMapLocation] = useState<IMapLocation>({
        zoomAmt: 1,
        zoomIn: false,
        viewBox: baseViewBox,
    });

    const tierARef = useRef<SVGPathElement | null>(null);
    const tierCRef = useRef<SVGPathElement | null>(null);
    const secFlRightRef = useRef<SVGPathElement | null>(null);
    const secFlLeftRef = useRef<SVGPathElement | null>(null);
    const thrdFlRightRef = useRef<SVGPathElement | null>(null);
    const thirdFlLeftRef = useRef<SVGPathElement | null>(null);

    const fwdRefObj = {
        a: tierARef,
        c: tierCRef,
        sFlR: secFlRightRef,
        sFlL: secFlLeftRef,
        tFlR: thrdFlRightRef,
        tFlL: thirdFlLeftRef,
    }

    const handleSetMapLocation = (mapLocationData: IMapLocation) => {
        setMapLocation(mapLocationData)
    }

    const handleSetNavHeaderIndex = (index: number) => {
        setNavHeaderIndex(index);
    }

    const handleSetLayoutMainHeight = (height: number) => {
        setLayoutMainHeight(height);
    }

    const handleZoom = () => {
        setZoomOut(true);
    }

    /*     const updateSideBarNav = (data: ISeat | ISeat[]) => {
            setMapNavSeatData(data);
        }
    
        const resetSideBarNav = () => {
            setMapNavSeatData(sessionSeats);
        } */

    const addSelectedSeat = (seatData: ISeat) => {
        setSelectedSeats(prev => [...prev, seatData]);
    }

    /*     const showUnavailableSeatModal = (seatData: ISeat) => {
            
        } */

    const removeSelectedSeat = (seatData: ISeat) => {
        setSelectedSeats(prev => {
            const updatedSelectedSeats: ISeat[] = prev.filter(seat => seat._id !== seatData._id)
            return updatedSelectedSeats;
        });
    }

    /*     const updateNavTitle = (title: string) => {
            setNavTitle(title)
        } */

    const handleModal = (data: ISeat) => {
        setModalData(data)
        onOpen();
    }
    /*
        const getCurrentSeats = (patron: IPatronData, seatToSave: ISeat) => {
            if (patron.numberRequested > 1) {
                return sessionSeats
                    .filter(
                        seat =>
                            seat.section === seatToSave.section &&
                            seat.row === seatToSave.row &&
                            seat.seatNumber >= seatToSave.seatNumber &&
                            seat.seatNumber < seatToSave.seatNumber + patron.numberRequested
                    )
                    .sort((a, b) => a.seatNumber - b.seatNumber);
            }
    
            return seatToSave;
        }
    */

    /* UPDATES ALL SEATS */
    const handleUpdatingSessionsSeats = async (currentSeats: ISeat | ISeat[], patronID: string) => {
        const updatedSeatData = { available: false, assignedTo: patronID }

        /* update state - client side */
        updateSessionSeats(prev => {
            const updateCurrentSeats = dataUpdater(prev, currentSeats, updatedSeatData) as ISeat[];
            const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];
            return sortedUpdateCurrentSeats;
        });

        /* update database - server side */
        try {
            const response = await updateSeat({
                seatID: Array.isArray(currentSeats) ? currentSeats.map(seat => seat._id) : currentSeats._id,
                ...updatedSeatData
            })

            if (response && response.data) {
                if (Array.isArray(currentSeats)) {
                    const idArray = currentSeats.map(seat => seat._id);
                    console.log(`Seats ${idArray} sucessfully updated in database.`);
                }
                else console.log(`Seat ${currentSeats._id} sucessfully updated in database.`);
            }
            else console.log("Unhandled error after attempting to update seats in database.")
        } catch (err) {
            console.log("Error when updating seats in database.");
            console.error(err);
        }
    }

    /* UPDATES ALL PATRONS */
    const handleUpdatingPatrons = async (currentSeats: ISeat[], selectedPatron: IPatronData) => {

        const seatID = currentSeats.map(seat => seat._id);
        let updatedPatronData = { seatID: seatID, arrived: true };
        if (selectedPatron.eventID.length === 0) updatedPatronData = { ...updatedPatronData, ...{ eventID: eventID } };

        /* update state - client side */
        updatePatrons(prev => {
            return dataUpdater(prev, selectedPatron, updatedPatronData) as IPatronData[];
        });

        /* update database - server side */

        try {
            let data;
            if (selectedPatron._id) data = await updatePatronAPI(selectedPatron._id as string, updatedPatronData)
            else data = await addPatronAPI({ ...selectedPatron, ...updatedPatronData });
            if (data) {
                console.log(`Patron ${selectedPatron.fullName} sucessfully updated in database.`);
                if (data.patronID) return data.patronID;
                else return null;
            } else console.log("Unhandled error after attempting to update patron in database.")
        } catch (err) {
            console.log("Error when updating patron in database.");
            console.error(err);
        }
    }

    const savePatronsToSeats = async (seatToSave: ISeat[], selectedPatron: IPatronData) => {
        console.log(selectedPatron)
        try {
            const id = await handleUpdatingPatrons(seatToSave, selectedPatron);
            const patronID = id ? id : selectedPatron._id;
            handleUpdatingSessionsSeats(seatToSave, patronID as string);
            //setMapNavSeatData(sessionSeats);
            setPatronDataMap(prev => {
                if (!prev?.has(patronID)) prev?.set(patronID, selectedPatron);
                return prev;
            })
            setSelectedSeats([]);
        } catch (err) {
            //TODO
            console.warn(`Unable to add/update ${selectedPatron.fullName}. ${seatToSave.length} seat(s) not updated.`)
            console.error(err);
        }
    }

    useEffect(() => {
        const fetchPatrons = async () => {
            try {
                const response = await getPatrons({ eventID: eventID });
                if (response) {
                    const patronList: IPatronData[] = response.data;
                    if (patronList.length === 0) console.warn("No patrons have been added for this event.")
                    updatePatrons(patronList);
                }
            } catch (err) {
                console.error("Error fetching patrons: ", err);
            }
        }

        const fetchSeats = async () => {
            try {
                const res = await getEventSeats({ seatIDs: inPlaySeatIDs });
                if (res) {
                    const seatList: ISeat[] = res;
                    const allSeatsSortedArray = seatSorter(seatList, "array") as ISeat[];
                    updateSessionSeats(allSeatsSortedArray)
                } else console.error("Unknown and unhandled error");
            } catch (err) {
                console.error(err);
            }
        }

        fetchSeats();
        fetchPatrons();
    }, [eventID, inPlaySeatIDs]);

    useEffect(() => {
        const pDataMap = mapper(patronData) as Map<string, IPatronData>;
        setPatronDataMap(pDataMap);
    }, [patronData]);


    useSocket({
        seatDataMap,
        updateSessionSeats,
        changePage,
        eventsLoaded
    });

    useEffect(() => {
        const refs = [tierARef, tierCRef, secFlRightRef, secFlLeftRef, thrdFlRightRef, thirdFlLeftRef, null];
        const ref = refs[navHeaderIndex];

        if (ref && ref.current) {
            const newViewBox = calculateNewViewBox(ref.current, 3.3)
            setMapLocation({
                zoomAmt: ref === tierCRef ? 2 : 3,
                zoomIn: true,
                viewBox: newViewBox,
            });
        } else {
            setMapLocation({
                zoomAmt: 1,
                zoomIn: false,
                viewBox: baseViewBox,
            })
        }

    }, [navHeaderIndex]);

    return (
        <LiveEventContext.Provider
            value={{
                sortedInPlaySeats: sortedInPlaySeats,
                sortedStructInPlaySeats: sortedStructInPlaySeats,
                seatDataMap: seatDataMap,
                patronData: patronData,
                patronDataMap: patronDataMap,
                updatePatrons: updatePatrons,
                updateSessionSeats: updateSessionSeats,
                savePatronsToSeats: savePatronsToSeats,
                addSelectedSeat: addSelectedSeat,
                removeSelectedSeat: removeSelectedSeat,
            }}>
            <SeatingMapLayout isLive={true}>
                <SeatingMapLayout.Header>
                    <SeatingMapTitle
                        changePage={changePage}
                        eventsLoaded={eventsLoaded} />
                </SeatingMapLayout.Header>
                <SeatingMapLayout.Main
                    setHeight={handleSetLayoutMainHeight}>
                    <MapSVG
                        zoomOut={zoomOut}
                        height={layoutMainHeight}
                        fwdRefObj={fwdRefObj}
                        mapLocation={mapLocation} 
                        setMapLocation={handleSetMapLocation}
                        />
                </SeatingMapLayout.Main>
                <SeatingMapLayout.Nav>
                    <MapNav
                        mapNavSeatData={selectedSeats}
                        handleModal={handleModal}
                        totalNumOfSeats={inPlaySeats.length}
                        handleZoomOut={handleZoom}
                        setMapLocation={handleSetNavHeaderIndex} />
                </SeatingMapLayout.Nav>
            </SeatingMapLayout>
            <SeatDataModal
                isOpen={isOpen}
                onClose={onClose}
                seatInfo={modalData} />
        </LiveEventContext.Provider>
    )
}

export default SeatingMapManager;