import { Box, Flex, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Center, useDisclosure, Checkbox } from "@chakra-ui/react"
import { IAppData, ISeat } from "../utils/interfaces";
import { useContext, useState } from "react";
import { ISeatMeta } from "../utils/creatorInterfaces";
import { DataContext } from "../context/context";
import NavSeatSelectorModal from "./NavSeatSelectorModal";

const MapNavCreator = ({ seatMeta, updateMeta }: { seatMeta: ISeatMeta, updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>> }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(DataContext);
    const { sortedSeatData } = contextData as IAppData;
    const [modalContent, setModalContent] = useState<ISeat[]>([]);
    //const { tierARowA, tierARowB, tierCLeft, tierCRight, tierCLeftCenter, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;
    const { tierARowA, tierARowB } = sortedSeatData;
    const handleCheck = (evt: React.ChangeEvent<HTMLInputElement>, data: ISeat[]) => {
        const isChecked = evt.target.checked
        let meta = {}

        data.forEach(info =>
            meta = {
                ...meta,
                [info._id]: {
                    seat: info,
                    isSelected: isChecked,
                }
            })

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
                                <Box display="flex" flexDirection="column">
                                    <Flex justifyContent="space-between">
                                        - Row A -
                                        <Checkbox onChange={(evt) => handleCheck(evt, tierARowA)}>Select All</Checkbox>
                                    </Flex>
                                    <Center>
                                    <Button onClick={() => handleModalBtnClick(tierARowA)}>Select Individual Seats</Button>
                                </Center>
                                </Box>
                                <Flex justifyContent="space-between">
                                    - Row B -
                                    <Checkbox onChange={(evt) => handleCheck(evt, tierARowB)}>Select All</Checkbox>
                                </Flex>
                                <Center>
                                    <Button onClick={() => handleModalBtnClick(tierARowB)}>Select Individual Seats</Button>
                                </Center>
                                <Flex justifyContent="space-between">
                                    - Row C -
                                </Flex>
                                <Flex justifyContent="space-between">
                                    - Row D -
                                </Flex>
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ top: 0, width: "100%" }}>
                    <Center>Tier C</Center>
                </Box>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ top: 0, width: "100%" }}>
                    <Center>2nd Floor Right Wing</Center>
                </Box>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ top: 0, width: "100%" }}>
                    <Center>2nd Floor Left Wing</Center>
                </Box>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ top: 0, width: "100%" }}>
                    <Center>3rd Floor Left Wing</Center>
                </Box>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ top: 0, width: "100%" }}>
                    <Center>3rd Floor Left Wing</Center>
                </Box>
            </Flex>
            <NavSeatSelectorModal isOpen={isOpen} onClose={onClose} handleCheck={handleCheck} content={modalContent} seatMeta={seatMeta} />
        </>
    )
}

export default MapNavCreator;

