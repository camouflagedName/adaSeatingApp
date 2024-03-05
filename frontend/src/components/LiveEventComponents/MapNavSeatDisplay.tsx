import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Center, Menu, MenuButton, Button, MenuList, MenuItem, Text, useDisclosure } from "@chakra-ui/react";
import { IPatronData, ISeat } from "../../interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { LiveEventContext } from "../../context/context";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
import SeatNotesModal from "../SeatNotesModal";

interface passedProps {
    seatData: ISeat[];
}

const initPatronData: IPatronData = {
    _id: "",
    eventID: "",
    fullName: "",
    callAhead: false,
    numberRequested: 0,
    arrived: false,
    notes: [],
    seatID: [],
}

const MapNavSeatDisplay = ({ seatData }: passedProps) => {
    const { patronData, savePatronsToSeats } = useContext(LiveEventContext) as IAppLiveEventData;
    const [thisPatronData, setThisPatronData] = useState<IPatronData>(initPatronData);
    const { isOpen, onOpen, onClose } = useDisclosure();


    const selectedSeats = seatData.map(seat => (
        <SimpleGrid columns={3} spacing={5}>
            <Text style={{ display: "flex", margin: "auto" }}>{seat.section.split(/(?=[A-Z])/).join(" ")}</Text>
            <Text style={{ display: "flex", margin: "auto" }}>{seat.row}</Text>
            <Text style={{ display: "flex", margin: "auto" }}>{seat.seatNumber}</Text>
        </SimpleGrid>
    ));

    const handleAssignToClick = (evt: React.MouseEvent<HTMLButtonElement>, patron?: IPatronData) => {

        if (patron) {
            setThisPatronData(patron)
        } else {
            const value = evt.currentTarget.textContent || "";
            const callAhead = false;
            const patronObj = {
                fullName: value,
                callAhead: callAhead,
                arrived: true,
                numberRequested: seatData.length,
            }
            setThisPatronData({ ...thisPatronData, ...patronObj });
        }
    }

    const handleNotesBtnClick = () => {
        onOpen();
    }

    const handleClose = (modalData: string[]) => {
        setThisPatronData(prev => ({ ...prev, notes: modalData }))
    }

    useEffect(() => {
        setThisPatronData(prev => {
            const updatedData = { numberRequest: seatData.length };
            return { ...prev, ...updatedData }
        })
    }, [seatData])

    return (
        <>
            <Box w='100%' p={4} >
                {selectedSeats}
            </Box>
            <Box w='100%' p={4} >
                <SimpleGrid columns={1} row={6} spacing={5} marginBottom={5}>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {thisPatronData.fullName.length > 0 ? `Assigned to ${thisPatronData.fullName}` : 'Assign to:'}
                        </MenuButton>
                        <MenuList style={{ zIndex: 10 }}>
                            <MenuItem value='walk-up' onClick={handleAssignToClick}>Walk-Up</MenuItem>
                            {patronData.map(patron => <MenuItem key={patron._id} value={patron._id} onClick={(evt) => handleAssignToClick(evt, patron)}>{patron.fullName}</MenuItem>)}
                        </MenuList>
                    </Menu>
                    <Box>
                        <Center>
                            <Button onClick={handleNotesBtnClick}>Patron Needs</Button>
                        </Center>
                    </Box>
                    <Center>
                        <Button
                            marginBottom={5}
                            onClick={() => savePatronsToSeats(seatData, thisPatronData)}
                            isDisabled={thisPatronData.fullName.length === 0 && seatData && seatData.length > 0}
                        >Assign Seat(s)</Button>
                    </Center>
                </SimpleGrid>
            </Box>
            <SeatNotesModal isOpen={isOpen} onClose={onClose} handleClose={handleClose} />
        </>
    );
}

export default MapNavSeatDisplay;