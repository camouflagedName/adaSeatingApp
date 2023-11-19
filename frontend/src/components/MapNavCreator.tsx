import { Box, Flex, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Center, useDisclosure, Checkbox } from "@chakra-ui/react"
import { IAppData, ISeat } from "../interfaces/interfaces";
import { useContext, useState } from "react";
import { ISeatMeta } from "../interfaces/creatorInterfaces";
import { DataContext } from "../context/context";
import NavSeatSelectorModal from "./NavSeatSelectorModal";
import handleCheck from "../utils/handleCheck";

const MapNavCreator = ({ seatMeta, updateMeta }: { seatMeta: ISeatMeta, updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>> }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(DataContext);
    const { sortedSeatData } = contextData as IAppData;
    const [modalContent, setModalContent] = useState<ISeat[]>([]);
    //const { tierARowA, tierARowB, tierCLeft, tierCRight, tierCLeftCenter, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;
    const { tierARowA, tierARowB, tierCLeft, tierCLeftCenter, tierCRight, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;
    const tierC = [...tierCLeft, ...tierCLeftCenter, ...tierCRight, ...tierCRightCenter]

    const handleSelectedCheck = (meta: object) => {
        const copyOfSeatMeta = { ...seatMeta, ...meta }
        updateMeta(copyOfSeatMeta);
    }

    const handleModalBtnClick = (content: ISeat[]) => {
        setModalContent(content)
        onOpen();
    }

    return (
        <>
            <Flex id="navContainer" direction="column" borderWidth="1px" borderRadius={"sm"} style={{ position: 'relative', height: "100%", overflow: 'auto' }}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton bg={'gray.100'} >
                            <Box w='100%' p={4} fontWeight='bold' color={'blue.600'} style={{ top: 0, width: "100%" }}>
                                <Center>Tier A</Center>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel >
                            <SimpleGrid row={4} spacing={5} >
                                <MapNavCreatorRowSelector label="Row A" seatDataArr={tierARowA} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                                <MapNavCreatorRowSelector label="Row B" seatDataArr={tierARowB} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton bg={'gray.100'} >
                            <Box w='100%' p={4} fontWeight='bold' color={'blue.600'} style={{ top: 0, width: "100%" }}>
                                <Center>Tier C</Center>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel >
                            <SimpleGrid row={4} spacing={5} >
                                <MapNavCreatorRowSelector label="Tier C" seatDataArr={tierC} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton bg={'gray.100'} >
                            <Box w='100%' p={4} fontWeight='bold' color={'blue.600'} style={{ top: 0, width: "100%" }}>
                                <Center>2nd Floor Wings</Center>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel >
                            <SimpleGrid row={4} spacing={5} >
                                <MapNavCreatorRowSelector label="2nd Floor Right Wing" seatDataArr={secondRightWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                                <MapNavCreatorRowSelector label="2nd Floor Left Wing" seatDataArr={secondLeftWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton bg={'gray.100'} >
                            <Box w='100%' p={4} fontWeight='bold' color={'blue.600'} style={{ top: 0, width: "100%" }}>
                                <Center>3rd Floor Wings</Center>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel >
                            <SimpleGrid row={4} spacing={5} >
                                <MapNavCreatorRowSelector label="3rd Floor Right Wing" seatDataArr={thirdRightWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                                <MapNavCreatorRowSelector label="3rd Floor Left Wing" seatDataArr={thirdLeftWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick}/>
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
            <NavSeatSelectorModal isOpen={isOpen} onClose={onClose} handleSelectedSeatCheck={handleSelectedCheck} content={modalContent} seatMeta={seatMeta} />
        </>
    )
}

export default MapNavCreator;


const MapNavCreatorRowSelector = ({ label, seatDataArr, handleSelectedRowCheck, handleModalBtnClick }: { label: string, seatDataArr: ISeat[], handleSelectedRowCheck: (param: object) => void, handleModalBtnClick: (content: ISeat[]) => void }) => {

    return (
        <>
            <Box display="flex" flexDirection="column">
                <Flex justifyContent="space-between">
                    {`- ${label} -`}
                    <Checkbox onChange={(evt) => handleCheck(evt, seatDataArr, handleSelectedRowCheck)}>Select All</Checkbox>
                </Flex>
                <Center>
                    <Button onClick={() => handleModalBtnClick(seatDataArr)}>Select Individual Seats</Button>
                </Center>
            </Box>
        </>
    )
}

