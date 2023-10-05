import { Box, Flex, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
import { ISeat } from "../utils/interfaces";


const MapNav = ({ seatData }: { seatData: ISeat[] }) => {
    console.log(seatData)

    return (
        <Flex id="navContainer" direction="column" borderWidth="1px" borderRadius={"sm"} style={{ position: 'relative', height: "100%", overflow: 'auto' }}>
            <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ position: 'sticky', top: 0, width: "100%" }}>
                <SimpleGrid columns={3} spacing={10} >
                    <Box>SEC</Box>
                    <Box>ROW</Box>
                    <Box>NUM</Box>
                </SimpleGrid>
            </Box>
            {
                seatData.map(seatInfo =>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <AccordionButton>
                                <Box w='100%' p={4} >
                                    <SimpleGrid columns={3} spacing={5}>
                                        <Box>{seatInfo.section}</Box>
                                        <Box>{seatInfo.row}</Box>
                                        <Box>{seatInfo.seatNumber}</Box>
                                    </SimpleGrid>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel >
                                <Box w='100%' p={4} >
                                    <SimpleGrid columns={1} row={3} spacing={5}>
                                        <Box>{seatInfo.available}</Box>
                                        <Box>{seatInfo.row}</Box>
                                        <Box>{seatInfo.seatNumber}</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionPanel>

                        </AccordionItem>
                    </Accordion>
                )
            }

        </Flex>
    )
}

export default MapNav;

