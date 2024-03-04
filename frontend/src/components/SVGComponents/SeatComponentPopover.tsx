import { Popover, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Badge, Box, Heading, Stack, StackDivider, Text, useDisclosure, Portal } from "@chakra-ui/react";
import { IPatronData, ISeat } from "../../interfaces/interfaces";
import { RefObject, useContext, useEffect, useState } from "react";
import { LiveEventContext } from "../../context/context";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
//import SeatComponent from "./SeatComponent";
//import withLiveEventSeatLogic from "./withLiveEventSeatLogic";

const basePatronData: IPatronData = {
    _id: "",
    eventID: "",
    fullName: "",
    callAhead: false,
    numberRequested: 0,
    arrived: false,
    notes: [],
    seatID: []
}

interface SeatComponentProps {
    cx: string;
    cy: string;
    seat: ISeat;
    patronID: string;
    forwardRef: RefObject<HTMLDivElement | null>;
}


const SeatComponentPopover = ({ patronID, forwardRef }: SeatComponentProps) => {
    const { isOpen, onClose } = useDisclosure();
    const { seatDataMap, patronDataMap } = useContext(LiveEventContext) as IAppLiveEventData;
    const [patronData, setPatronData] = useState<IPatronData>(basePatronData);

    useEffect(() => {
        const patron = patronDataMap.get(patronID);
        if (patron) setPatronData(patron);
    }, [patronDataMap, patronID]);

    useEffect(() => {
        console.log("REF reference")
        console.log(forwardRef)
    }, [forwardRef])

    console.log(isOpen)

    return (
        <>
            <Popover
                isLazy
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}
                placement='right'
            >
                <Portal containerRef={forwardRef}>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Patron
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {patronData.fullName}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Seats
                                </Heading>

                                {
                                    patronData.seatID.map(id => {
                                        const seatData = seatDataMap.get(id) as ISeat;
                                        return <Text key={id} pt='2' fontSize='sm'>{`${seatData.section.split(/(?=[A-Z])/).join(" ")}, Row ${seatData.row}, #${seatData.seatNumber}`}</Text>
                                    })
                                }

                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Notes
                                </Heading>
                                {patronData.notes.map(note => (
                                    <Box key={note}>
                                        <Badge>{note}</Badge>
                                    </Box>
                                ))}
                            </Box>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover >
        </>
    );
}

export default SeatComponentPopover;