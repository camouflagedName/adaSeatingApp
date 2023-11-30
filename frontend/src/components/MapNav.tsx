import { Box, Button, Center, Flex, SimpleGrid } from "@chakra-ui/react"
import { IAppData, IPatronData, ISeat } from "../interfaces/interfaces";
import { IAppLiveEventData } from "../interfaces/liveEventInterfaces";
import { useContext, useEffect, useState } from "react";
import { DataContext, LiveEventContext } from "../context/context";
import ScrollChunkComponent from "./ScrollChunkComponent";
import dataUpdater from "../utils/dataUpdater";
import MapNavAccordion from "./MapNavAccordion";
import seatSorter from "../utils/seatSorter";

const MapNav = ({ mapNavSeatData, handleModal, updateSidebar, navTitle }:
    { mapNavSeatData: (ISeat[] | ISeat), handleModal: (param: ISeat) => void, updateSidebar: () => void, navTitle: string }) => {
    const contextData = useContext(DataContext);
    const { patronData, updateSeats, updatePatrons } = contextData as IAppData;
    const liveEventData = useContext(LiveEventContext)
    const { sortedInPlaySeats } = liveEventData as IAppLiveEventData;
    const [isBottom, setIsBottom] = useState(false);
    const [currentSeats, setCurrentSeats] = useState(mapNavSeatData)

    const handleScroll = (evt: React.UIEvent<HTMLDivElement>) => {
        const atBottom = evt.currentTarget.scrollHeight - evt.currentTarget.scrollTop === evt.currentTarget.clientHeight;
        setIsBottom(atBottom);
    }

    const handleUpdate = (selectedSeatData: ISeat, selectedPatron: IPatronData) => {
        const updatedSeatData = { available: false, assignedTo: selectedPatron._id }

        if (selectedPatron.numberRequested > 1) {
            const seatIDArr: string[] = [];
            const sortedFilteredSeatList = sortedInPlaySeats.filter(seat => seat.section === selectedSeatData.section && seat.row === selectedSeatData.row).sort((a, b) => a.seatNumber - b.seatNumber)
            const selectedSeatArr = sortedFilteredSeatList.filter(seat => seat.seatNumber >= selectedSeatData.seatNumber && seat.seatNumber < selectedSeatData.seatNumber + selectedPatron.numberRequested)
            const updatedAllSeats = dataUpdater(sortedInPlaySeats, selectedSeatArr, updatedSeatData) as ISeat[];
            const sortedUpdatedSeats = seatSorter(updatedAllSeats, "array") as ISeat[];

            /* UPDATES ALL SEATS */
            updateSeats(sortedUpdatedSeats);

            selectedSeatArr.forEach(seat => {
                seatIDArr.push(seat._id)
            })

            const updatedPatron = dataUpdater(patronData, selectedPatron, { seatID: seatIDArr, arrived: true }) as IPatronData[];
            updatePatrons(updatedPatron);

            if (Array.isArray(mapNavSeatData)) {
                setCurrentSeats(prev => {
                    const currentAsArray = prev as ISeat[];
                    const updateCurrentSeats = dataUpdater(currentAsArray, selectedSeatArr, updatedSeatData) as ISeat[];
                    const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];
                    return sortedUpdateCurrentSeats;
                });
            } else setCurrentSeats({ ...selectedSeatData, available: false, assignedTo: selectedPatron._id })

        } else {
            const updatedSeats = dataUpdater(sortedInPlaySeats, selectedSeatData, updatedSeatData) as ISeat[];
            const sortedUpdatedSeats = seatSorter(updatedSeats, "array") as ISeat[];
            const updatedPatron = dataUpdater(patronData, selectedPatron, { seatID: [selectedSeatData._id], arrived: true }) as IPatronData[];

            /* UPDATES ALL SEATS */
            updateSeats(sortedUpdatedSeats)
            updatePatrons(updatedPatron);
            if (Array.isArray(mapNavSeatData)) setCurrentSeats(prev => {
                const currentAsArray = prev as ISeat[];
                const updateCurrentSeats = dataUpdater(currentAsArray, selectedSeatData, updatedSeatData) as ISeat[];
                const sortedUpdateCurrentSeats = seatSorter(updateCurrentSeats, "array") as ISeat[];
                return sortedUpdateCurrentSeats;
            });
            else setCurrentSeats({ ...selectedSeatData, available: false, assignedTo: selectedPatron._id })
        }
    }

    useEffect(() => {
        setCurrentSeats(mapNavSeatData)
    }, [mapNavSeatData])

    return (
        <>
            <Flex id="navContainer" direction="column" borderWidth="1px" borderRadius={"sm"} style={{ position: 'relative', height: "100%", overflow: 'auto' }} onScroll={handleScroll}>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' color={'blue.600'} style={{ position: 'sticky', top: 0, width: "100%" }}>
                    <Center>{navTitle}</Center>
                </Box>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ position: 'sticky', top: 0, width: "100%", zIndex: 100, }}>
                    <SimpleGrid columns={3} spacing={10} >
                        <Box>SEC</Box>
                        <Box>ROW</Box>
                        <Box>NUM</Box>
                    </SimpleGrid>
                </Box>
                {Array.isArray(currentSeats) ?
                    <ScrollChunkComponent
                        seatData={currentSeats}
                        handleModal={handleModal}
                        handleUpdate={handleUpdate}
                        isBottom={isBottom} /> :
                    <>
                        <MapNavAccordion
                            key={currentSeats._id}
                            seatInfo={currentSeats}
                            handleModal={handleModal}
                            handleUpdate={handleUpdate} />
                        <Button onClick={() => updateSidebar()}>Show All Seats</Button>
                    </>
                }
            </Flex>
        </>
    )
}

export default MapNav;