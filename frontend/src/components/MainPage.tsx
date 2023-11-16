import { Flex, Container, Menu, MenuButton, Button, MenuList, MenuItem, VStack, Text, StackDivider, Center, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { IAppData } from "../utils/interfaces"
import SeatingMap from "./SeatingMap";
import SeatingMapCreator from "./SeatingMapCreator";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/context";
import QRCode from "react-qr-code";

//import './App.css'
const currentDate = new Date();
const MainPage = ({ changePage }: { changePage: (param: React.ReactElement) => void }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const contextData = useContext(DataContext);
    const { seatData, eventData } = contextData as IAppData;
    const [eventList, setEventList] = useState(eventData);

    const handleClickEdit = (eventID: string) => {
        console.log(eventID)
    }

    const handleClickStart = (eventID: string) => {
        console.log(eventID)
        changePage(<SeatingMap seatData={seatData} />)
    }

    const handleClickCreate = () => {
        changePage(<SeatingMapCreator seatData={seatData} changePage={changePage} />)
    }


    const currentEvent = eventList.filter(event => event.date.toLocaleString().split("T")[0] === currentDate.toISOString().split("T")[0]).map(event => {
        return (
            <Menu>
                <MenuButton key={`menu-${event._id}`} as={Button}>
                    {event.name}
                </MenuButton>
                <MenuList key={`menuList-${event._id}`}>
                    <MenuItem key={`edit_${event._id}`} onClick={() => handleClickEdit(event._id)}>Edit</MenuItem>
                    <MenuItem key={`start_${event._id}`} onClick={() => handleClickStart(event._id)}>Start</MenuItem>
                </MenuList>
            </Menu>
        )
    })

    useEffect(() => {
        setEventList(eventData)
    }, [eventData])

    return (
        <>
            <Flex justify='center' style={{ height: "100vh" }}>
                <Container centerContent maxW='container.lg' style={{ margin: "auto" }}>
                    <VStack spacing={10} divider={<StackDivider borderColor='gray.400' />}>
                        <Center>
                            <Text textAlign="center" fontSize='4xl'>Welcome to The Anthem Seating App</Text>
                        </Center>
                        <Container centerContent maxW='container.lg' style={{ margin: "auto" }}>
                            <Text fontSize='2xl' > Choose one below: </Text>
                            <Text fontSize='xl' margin={5}> Current Event: </Text>
                            {currentEvent.length > 0 ? currentEvent : <Text fontSize='l' style={{ fontWeight: 'bold' }}> -- No Scheduled Event -- </Text>}
                            <Text fontSize='xl' margin={5}> Upcoming Events: </Text>
                            <VStack>
                                {
                                    eventList.map(event => {
                                        console.log(event.date.toLocaleString().split("T")[0])
                                        console.log(currentDate)
                                          if (event.date.toLocaleString().split("T")[0] !== currentDate.toISOString().split("T")[0]) return (
                                            <>
                                                <Menu key={`futureEvents-menu-${event._id}`}>
                                                    <MenuButton key={`futureEvents-menuButton-${event._id}`} as={Button}>
                                                        {event.name}
                                                    </MenuButton>
                                                    <MenuList key={`futureEvents-menuList-${event._id}`}>
                                                        <MenuItem key={`futureEvents-edit_${event._id}`} onClick={() => handleClickEdit(event._id)}>Edit</MenuItem>
                                                        <MenuItem key={`futureEvents-start_${event._id}`} onClick={() => handleClickStart(event._id)}>Start</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </>
                                        )
                                    })
                                }
                            </VStack>
                        </Container>
                        <Button onClick={handleClickCreate}>Create Event</Button>
                    </VStack>
                </Container>
                <Button onClick={onOpen}>Share URL</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Center>
                                <QRCode value={`${window.location}`} />
                            </Center>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </>
    )
}

export default MainPage;