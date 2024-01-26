import { useDisclosure } from "@chakra-ui/react"
import { IAppData, IPatronData, ISeat, ISortedSeatMap } from "../../interfaces/interfaces";
import { useState, useContext, useMemo, useEffect } from "react";
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
import { getPatrons, updatePatron } from "../../api/patronAPI";
//import { Socket, io } from "socket.io-client";
//import API_ROOT from "../../api/apiRoot";
import { updateSeat } from "../../api/seatAPI";
import { getEventSeats } from "../../api/seatAPI";
import MainPage from "../MainPage";


interface WebSocketData {
    seatID: string | string[];
    updates: {
        available: boolean,
        assignedTo?: string,
    };
}

//TODO: make sure it syncs with database
//TODO: check for occupied seats

const SeatingMapManager = ({ changePage, inPlaySeatIDs, eventID }: { changePage: (param: React.ReactElement) => void, inPlaySeatIDs: string[], eventID: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(DataContext);

    //TODO: create state for sortedInPlaySeats
    const { seatData, eventHasStarted, setEventHasStarted, socket } = contextData as IAppData;
    const inPlaySeats = seatData.filter(seat => inPlaySeatIDs.includes(seat._id))
    const seatDataMap = useMemo(() => mapper(inPlaySeats) as Map<string, ISeat>, [inPlaySeats]);

    /*     
    const sortedInPlaySeats = useMemo(() => {
        const inPlaySeats = seatData.filter(seat => inPlaySeatIDs.includes(seat._id));
        return seatSorter(inPlaySeats, "array") as ISeat[];
      }, [seatData, inPlaySeatIDs]);
       */

    const [modalData, setModalData] = useState<ISeat>();
    const [navTitle, setNavTitle] = useState('ALL SEATS');
    const [patronData, updatePatrons] = useState<IPatronData[]>([]);
    const [patronDataMap, setPatronDataMap] = useState<Map<string, IPatronData>>();
    const [sessionSeats, updateSessionSeats] = useState<ISeat[]>([]);
    const sortedInPlaySeats = seatSorter(sessionSeats, "array") as ISeat[];
    const sortedStructInPlaySeats = seatSorter(sessionSeats) as ISortedSeatMap;
    const [mapNavSeatData, setMapNavSeatData] = useState<ISeat[] | ISeat>(sortedInPlaySeats);
    const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
    const [zoomOut, setZoomOut] = useState(false);


    const handleZoom = () => {
        setZoomOut(true);
    }

    const updateSideBarNav = (data?: ISeat | ISeat[]) => {
        if (data) setMapNavSeatData(data);
        else setMapNavSeatData(sessionSeats);
    }

    const addSelectedSeat = (seatData: ISeat) => {
        setSelectedSeats(prev => [...prev, seatData]);
    }

    const removeSelectedSeat = (seatData: ISeat) => {
        setSelectedSeats(prev => {
            const updatedSelectedSeats: ISeat[] = prev.filter(seat => seat._id !== seatData._id)
            return updatedSelectedSeats;
        });
    }

    const updateNavTitle = (title: string) => {
        setNavTitle(title)
    }

    const handleModal = (data: ISeat) => {
        setModalData(data)
        onOpen();
    }

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
    const handleUpdatingPatrons = async (currentSeats: ISeat | ISeat[], selectedPatron: IPatronData, seatToSaveID: string) => {
        const seatID = Array.isArray(currentSeats) ? currentSeats.map(seat => seat._id) : [seatToSaveID];
        const updatedPatronData = { seatID: seatID, arrived: true }

        /* update state - client side */
        updatePatrons(prev => {
            return dataUpdater(prev, selectedPatron, updatedPatronData) as IPatronData[];
        });

        /* update database - server side */
        try {
            const response = await updatePatron(selectedPatron._id as string, updatedPatronData)
            if (response && response.data) console.log(`Patron ${selectedPatron.fullName} sucessfully updated in database.`);
            else console.log("Unhandled error after attempting to update patron in database.")
        } catch (err) {
            console.log("Error when updating patron in database.");
            console.error(err);
        }
    }

    const savePatronsToSeats = (seatToSave: ISeat, selectedPatron: IPatronData) => {
        const currentSeats = getCurrentSeats(selectedPatron, seatToSave);

        handleUpdatingSessionsSeats(currentSeats, selectedPatron._id as string);
        handleUpdatingPatrons(currentSeats, selectedPatron, seatToSave._id);
        setMapNavSeatData(sessionSeats)
        setSelectedSeats([]);
    }

    useEffect(() => {
        //console.log("CCCCCCCCCCCCCCCCCC")
        const fetchPatrons = async () => {
            try {
                const response = await getPatrons({ eventId: eventID });
                if (response) {
                    const patronList: IPatronData[] = response.data;
                    updatePatrons(patronList);
                }
            } catch (err) {
                console.error("Error fetching patrons: ", err);
            }
        }

        const fetchSeats = async () => {

            try {

                //TODO: add eventID to getEventSeats()
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
    }, [eventID, eventHasStarted, inPlaySeatIDs]);

    useEffect(() => {
        //console.log("AAAAAAAAA")
        if (selectedSeats.length > 0) setMapNavSeatData(selectedSeats);
        else setMapNavSeatData(sessionSeats);
    }, [selectedSeats, sessionSeats])

    useEffect(() => {
        //console.log("BBBBBBBBBBBBBBB")
        const pDataMap = mapper(patronData) as Map<string, IPatronData>;
        setPatronDataMap(pDataMap);
    }, [patronData]);


    useEffect(() => {
        if (socket) {
            socket.on('seat updated', (data: WebSocketData) => {
                console.log('seat updated')
                console.log('Received data: ', data);

                //TODO: fix and add more logic
                const updatedSeatData = data.updates;
                let seatsToUpdate: ISeat | ISeat[];


                // TODO: update logic after testing ?
                if (Array.isArray(data.seatID)) {
                    seatsToUpdate = data.seatID.map(seatID => seatDataMap.get(seatID) as ISeat);
                } else {
                    seatsToUpdate = seatDataMap.get(data.seatID) as ISeat;
                }

                updateSessionSeats(prev => {
                    const updateCurrentSeats = dataUpdater(prev, seatsToUpdate, updatedSeatData) as ISeat[];
                    const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];

                    return sortedUpdateCurrentSeats;
                });
            });

            socket.on('event ended', (data) => {
                console.log(data);
                setEventHasStarted(false);
                changePage(<MainPage changePage={changePage} />);
            })
        } else {
            console.log("NO SOCKET CONNECTION FOUND");
        }

        return () => {
            if (socket) {
                // Remove event listener
                socket.off('seat updated');
            }
        };


    }, [seatDataMap, socket, changePage, setEventHasStarted]);

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
                updateSideBarNav: updateSideBarNav,
                updateNavTitle: updateNavTitle,
            }}>
            <SeatingMapLayout>
                <SeatingMapLayout.Header>
                    <SeatingMapTitle changePage={changePage} />
                </SeatingMapLayout.Header>
                <SeatingMapLayout.Main>
                    <MapSVG
                        updateSideBarNav={updateSideBarNav}
                        updateNavTitle={updateNavTitle}
                        zoomOut={zoomOut} />
                </SeatingMapLayout.Main>
                <SeatingMapLayout.Nav>
                    <MapNav
                        mapNavSeatData={mapNavSeatData}
                        handleModal={handleModal}
                        navTitle={navTitle}
                        totalNumOfSeats={inPlaySeats.length}
                        handleZoomOut={handleZoom} />
                </SeatingMapLayout.Nav>
                <SeatingMapLayout.Footer>
                    <></>
                </SeatingMapLayout.Footer>
            </SeatingMapLayout>
            <SeatDataModal
                isOpen={isOpen}
                onClose={onClose}
                seatInfo={modalData} />
        </LiveEventContext.Provider>
    )
}

export default SeatingMapManager;