import { Flex, Container, Menu, MenuButton, Button, MenuList, MenuItem, VStack, Text, StackDivider, useDisclosure, Modal, ModalOverlay, Badge, Spinner } from "@chakra-ui/react"
import { IAppData, IEventData } from "../interfaces/interfaces"
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/context";
import MainPageModal from "./MainPageModal";
import withAddPatrons from "./withAddPatrons";
import withShowQRCode from "./withShowQRCode";
import { resetSeats } from "../api/seatAPI";

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

//TEST: reset seats
//TODO: fix date


const MainPage = ({ changePage, eventsLoaded }: { changePage: (param: React.ReactElement) => void, eventsLoaded: boolean }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const contextData = useContext(DataContext);
    const { seatData, eventData, eventHasStarted, setEventHasStarted, socket } = contextData as IAppData;
    const [modalComponent, setModalComponent] = useState<React.ReactElement>(<></>);

    const showAddPatronModal = (event: IEventData) => {
        onOpen();

        const AddPatronComponent = withAddPatrons(MainPageModal);
        setModalComponent(<AddPatronComponent event={event} onClose={onClose} />)
    }

    const handleClickStart = async (event: IEventData) => {
        try {
            setEventHasStarted(true)
            const inPlaySeatIDs = event.seats ? event.seats : [];
            const { default: SeatingMapManager } = await import("./LiveEventComponents/SeatingMapManager");
            changePage(<SeatingMapManager changePage={changePage} inPlaySeatIDs={inPlaySeatIDs} eventID={event._id} eventsLoaded={eventsLoaded} />);


            //TODO: update database with liveEventMode: true OR make only current event available to "start"
            if (socket) {
                socket.emit("event started", { hasStarted: true })
            }
        } catch (err) {
            console.error("Error while importing SeatingMapManager", err)
        }
    }

    const handleClickCreate = async () => {
        try {
            const { default: SeatingMapCreator } = await import("./EventCreatorComponents/SeatingMapCreator");
            changePage(<SeatingMapCreator seatData={seatData} changePage={changePage} eventsLoaded={eventsLoaded} />);
        } catch (err) {
            console.error("Error while loading SeatingMapCreator", err);
        }
    }

    const handleEndEvent = async () => {
        try {
            const res = await resetSeats();
            console.log(res);
            if (res && res.status === 200) {
                //TODO
                setEventHasStarted(false);
                if (socket) {
                    socket.emit("event ended", { hasStarted: false })
                }
            }
        } catch (err) {
            console.error("Error when closing event", err);
        }
    }

    const currentEvent = eventData.filter(event => event.date.toLocaleString().split("T")[0] === currentDate.toISOString().split("T")[0])
        .map(event => {
            return (
                <Menu key={`menu-${event._id}`}>
                    <MenuButton as={Button}>
                        {event.name}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => showAddPatronModal(event)}>Add Patron</MenuItem>
                        <MenuItem onClick={() => handleClickStart(event)}>{` ${eventHasStarted ? "Join Event" : "Start Event"}`}</MenuItem>
                        {
                            eventHasStarted ? <MenuItem onClick={() => handleEndEvent()}>End Event</MenuItem> : <></>
                        }
                    </MenuList>
                </Menu>
            )
        })

    const showQRCode = () => {
        onOpen();
        const ShowQRComponent = withShowQRCode(MainPageModal);
        setModalComponent(<ShowQRComponent onClose={onClose} />);
    }

    interface LiveEventSocket {
        hasStarted: boolean;
    }

    useEffect(() => {
        if (socket) {
            socket.on('event started', (data: LiveEventSocket) => {
                console.log('event started');
                setEventHasStarted(data.hasStarted)

            });

            socket.on('event ended', (data: LiveEventSocket) => {
                console.log('event ended');
                console.log(data)
                setEventHasStarted(data.hasStarted)
            })
        } else console.log("NO SOCKET CONNECTION FOUND");

        return () => {
            if (socket) {
                // Remove event listener
                socket.off('event started');
                socket.off('event ended');
            }
        };


    }, [socket, setEventHasStarted]);

    return (
        <>
            <Flex direction='column' justify='center' style={{ height: "100vh" }}>
                <Container centerContent maxW='container.lg' style={{ margin: "auto" }}>
                    <VStack spacing={10} divider={<StackDivider borderColor='gray.400' />}>
                        <Text textAlign="center" fontSize='4xl'>
                            Welcome to The Anthem Seating App
                            <Badge ml="2" colorScheme="red" variant="subtle">ALPHA</Badge>
                        </Text>
                        <Container centerContent maxW='container.lg' style={{ margin: "auto" }}>
                            <Text fontSize='2xl' > Choose one below: </Text>
                            <Text fontSize='xl' margin={5}> Current Event: </Text>
                            {eventsLoaded ?
                                <>
                                    {
                                        currentEvent.length > 0 ? (
                                            <VStack>
                                                {currentEvent}
                                            </VStack>
                                        ) : <Text fontSize='l' style={{ fontWeight: 'bold' }}> -- No Scheduled Event -- </Text>
                                    }
                                </> :
                                <Spinner size='xl' />
                            }
                            <Text fontSize='xl' margin={5}> Upcoming Events: </Text>
                            <VStack>
                                {
                                    eventData.map(event => {
                                        if (event.date.toLocaleString().split("T")[0] > currentDate.toISOString().split("T")[0]) return (
                                            <Menu key={`futureEvents-menu-${event._id}`}>
                                                <MenuButton as={Button}>
                                                    {event.name}
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem onClick={() => showAddPatronModal(event)}>Add Patrons</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        )
                                    })
                                }
                            </VStack>
                        </Container>
                        <Button onClick={handleClickCreate}>Create Event</Button>
                    </VStack>
                </Container>
                <Button onClick={showQRCode}>Scan to Share URL</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    {modalComponent}
                </Modal>

            </Flex>
        </>
    )
}

export default MainPage;