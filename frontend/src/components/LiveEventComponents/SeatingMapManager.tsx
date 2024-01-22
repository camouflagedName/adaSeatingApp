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
import { io } from "socket.io-client";
import API_ROOT from "../../api/apiRoot";
import { updateSeat } from "../../api/seatAPI";

//import { patronsSeedData } from "../seedData/patrons";

interface WebSocketData {
    seatID: string | string[];
    updates: {
        available: boolean,
        assignedTo?: string,
    };
}

//TODO: check for occupied seats

const SeatingMapManager = ({ changePage, inPlaySeatIDs, eventID }: { changePage: (param: React.ReactElement) => void, inPlaySeatIDs: string[], eventID: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(DataContext);

    //TODO: create state for sortedInPlaySeats
    const { seatData } = contextData as IAppData;
    const inPlaySeats = seatData.filter(seat => inPlaySeatIDs.includes(seat._id))

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
    //const [seatDataMap, setSeatDataMap] = useState<Map<string, ISeat>>();
    const [sessionSeats, updateSessionSeats] = useState(inPlaySeats);
    const sortedInPlaySeats = seatSorter(sessionSeats, "array") as ISeat[];
    const sortedStructInPlaySeats = seatSorter(sessionSeats) as ISortedSeatMap;
    const [mapNavSeatData, setMapNavSeatData] = useState<ISeat[] | ISeat>(sortedInPlaySeats);
    const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
    const [zoomOut, setZoomOut] = useState(false);
    const seatDataMap = useMemo(() => mapper(inPlaySeats) as Map<string, ISeat>, [inPlaySeats])

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

    //TODO: finish this function
    /*     const updateSessionSeatsCallback = (allSeats: ISeat[], targetSeats, updateData) => {
            const updateCurrentSeats = dataUpdater(allSeats, targetSeats, updateData) as ISeat[];
            const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];
            return sortedUpdateCurrentSeats;
        } */

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

            console.log('patron update: ', response)
        } catch (err) {
            console.log("Error when updating seats in database.")
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
            console.log('patron update: ', response)
        } catch (err) {
            console.log("Error when updating patron in database.");
            console.error(err);
        }
    }

    const savePatronsToSeats = (seatToSave: ISeat, selectedPatron: IPatronData) => {
        //const updatedSeatData = { available: false, assignedTo: selectedPatron._id }
        const currentSeats = getCurrentSeats(selectedPatron, seatToSave);

        /* UPDATES ALL SEATS */
        /*         updateSessionSeats(prev => {
                    const updateCurrentSeats = dataUpdater(prev, currentSeats, updatedSeatData) as ISeat[];
                    const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];
                    return sortedUpdateCurrentSeats;
                }); */

        handleUpdatingSessionsSeats(currentSeats, selectedPatron._id as string);
        handleUpdatingPatrons(currentSeats, selectedPatron, seatToSave._id);

        /*UPDATES ALL PATRONS */
        /*         updatePatrons(prev => {
                    const seatID = Array.isArray(currentSeats) ? currentSeats.map(seat => seat._id) : seatToSave._id;
                    const updatedPatron = dataUpdater(prev, selectedPatron, { seatID: seatID, arrived: true }) as IPatronData[];
                    return updatedPatron;
                }); */

        setMapNavSeatData(sessionSeats)

        /*         setSelectedSeats(prev => {
                    const currentAsArray = prev as ISeat[];
                    const updateCurrentSeats = dataUpdater(currentAsArray, currentSeats, updatedSeatData) as ISeat[];
                    const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];
                    return sortedUpdateCurrentSeats;
                }); */

        /*    
            seatID: string[];
            assignedTo: string;
            available: boolean; 
        */



        setSelectedSeats([]);
    }

    useEffect(() => {
        if (selectedSeats.length > 0) setMapNavSeatData(selectedSeats);
        else setMapNavSeatData(sessionSeats);
    }, [selectedSeats, sessionSeats])

    useEffect(() => {
        const pDataMap = mapper(patronData) as Map<string, IPatronData>;
        //const sDataMap = mapper(seatData) as Map<string, ISeat>;
        setPatronDataMap(pDataMap);
        //setSeatDataMap(sDataMap)
    }, [patronData]);


    useEffect(() => {
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

        fetchPatrons();
    }, [eventID])



    useEffect(() => {
        const socket = io(API_ROOT, {
            withCredentials: true,
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log(`Connected to websocket with socked ID ${socket.id}`)
        })

        socket.on('seat updated', (data: WebSocketData) => {
            console.log('Received data: ', data);

            //TODO: fix and add more logic
            let updatedSeatData = data.updates;
            let seatsToUpdate: ISeat | ISeat[];

            /* REMOVE AFTER TESTING */
            if (!data.updates.available) {
                const randomPatron = patronData[0]._id;
                updatedSeatData = {
                    ...data.updates,
                    assignedTo: randomPatron
                };
            }

            // TODO: update logic after testing
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

        return () => {
            socket.disconnect();
        }
    }, [seatDataMap, patronData])

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