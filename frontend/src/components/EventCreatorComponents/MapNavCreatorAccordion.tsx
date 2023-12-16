import { Box, Accordion, AccordionItem, AccordionButton, Center, AccordionIcon, AccordionPanel, SimpleGrid } from "@chakra-ui/react";
import MapNavCreatorRowSelector from "./MapNavCreatorRowSelector";
import { ISeat } from "../../interfaces/interfaces";
import { ISeatMeta } from "../../interfaces/creatorInterfaces";


const MapNavCreatorAccordion = ({ title, section, seatMeta, handleModalBtnClick }: { title: string, section: { [key: string]: ISeat[] }, seatMeta: ISeatMeta, handleModalBtnClick: (content: ISeat[]) => void }) => {

    const rowsSelectorArray = Object.entries(section).map(([label, rowData]) => (
        <MapNavCreatorRowSelector key={label} label={label} seatDataArr={rowData} metaData={Object.entries(seatMeta).filter(([key]) => rowData.map(seat => seat._id).includes(key)) } handleModalBtnClick={handleModalBtnClick} />
    ));

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton bg={'gray.100'} >
                    <Box w='100%' p={4} fontWeight='bold' color={'blue.600'} style={{ top: 0, width: "100%" }}>
                        <Center>{title}</Center>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel >
                    <SimpleGrid row={rowsSelectorArray.length} spacing={5} >
                        {rowsSelectorArray}
                    </SimpleGrid>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default MapNavCreatorAccordion;