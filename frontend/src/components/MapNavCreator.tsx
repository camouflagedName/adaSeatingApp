import { Box, Flex, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Center, useDisclosure, Checkbox } from "@chakra-ui/react"
import { ISeat } from "../interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { IAppEventCreatorData, ISeatMeta } from "../interfaces/creatorInterfaces";
import { EventCreator } from "../context/context";
import NavSeatSelectorModal from "./NavSeatSelectorModal";
import handleCheck from "../utils/handleCheck";

const MapNavCreator = ({ seatMeta, updateMeta }: { seatMeta: ISeatMeta, updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>> }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(EventCreator);
    const { sortedSeatData } = contextData as IAppEventCreatorData;
    const [modalContent, setModalContent] = useState<ISeat[]>([]);
    const { tierARowA, tierARowB, tierCLeft, tierCLeftCenter, tierCRight, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;
    const tierC = [...tierCRight, ...tierCRightCenter, ...tierCLeft, ...tierCLeftCenter]

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
                                <MapNavCreatorRowSelector label="Row A" seatDataArr={tierARowA} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => tierARowA.map(seat => seat._id).includes(key))} />
                                <MapNavCreatorRowSelector label="Row B" seatDataArr={tierARowB} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => tierARowB.map(seat => seat._id).includes(key))} />
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
                                <MapNavCreatorRowSelector label="Tier C" seatDataArr={tierC} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => tierC.map(seat => seat._id).includes(key))} />
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
                                <MapNavCreatorRowSelector label="2nd Floor Right Wing" seatDataArr={secondRightWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => secondRightWing.map(seat => seat._id).includes(key))} />
                                <MapNavCreatorRowSelector label="2nd Floor Left Wing" seatDataArr={secondLeftWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => secondLeftWing.map(seat => seat._id).includes(key))} />
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
                                <MapNavCreatorRowSelector label="3rd Floor Right Wing" seatDataArr={thirdRightWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => thirdRightWing.map(seat => seat._id).includes(key))} />
                                <MapNavCreatorRowSelector label="3rd Floor Left Wing" seatDataArr={thirdLeftWing} handleSelectedRowCheck={handleSelectedCheck} handleModalBtnClick={handleModalBtnClick} metaData={Object.entries(seatMeta).filter(([key]) => thirdLeftWing.map(seat => seat._id).includes(key))} />
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


const MapNavCreatorRowSelector = ({ label, seatDataArr, handleSelectedRowCheck, handleModalBtnClick, metaData }:
    { label: string, seatDataArr: ISeat[], handleSelectedRowCheck: (param: object) => void, handleModalBtnClick: (content: ISeat[]) => void, metaData: [string, boolean][] }) => {
    const [isChecked, setIsChecked] = useState(true);


    useEffect(() => {
        if (metaData.length > 0) {
            let isCheckedEffectVal = true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const [_id, value] of metaData) {
                if (!value) {
                    isCheckedEffectVal = false
                    break;
                }
            }
            setIsChecked(isCheckedEffectVal);
        } else setIsChecked(false)

    }, [metaData])

    return (
        <>
            <Box display="flex" flexDirection="column">
                <Flex justifyContent="space-between">
                    {`- ${label} -`}
                    <Checkbox name={`${label}-checkbox`} onChange={(evt) => handleCheck(evt, seatDataArr, handleSelectedRowCheck)} isChecked={isChecked}>Select All</Checkbox>
                </Flex>
                <Center>
                    <Button onClick={() => handleModalBtnClick(seatDataArr)}>Select Individual Seats</Button>
                </Center>
            </Box>
        </>
    )
}

