import { Box, Button, Center, Flex, SimpleGrid } from "@chakra-ui/react"
import { ISeat } from "../interfaces/interfaces";
import { useState } from "react";
import ScrollChunkComponent from "./ScrollChunkComponent";
import MapNavAccordion from "./MapNavAccordion";

interface PassedProps {
    mapNavSeatData: (ISeat[] | ISeat),
    handleModal: (param: ISeat) => void;
    navTitle: string;
    totalNumOfSeats: number;
    handleZoomOut: () => void;
}

const MapNav = ({
    mapNavSeatData,
    handleModal,
    navTitle,
    totalNumOfSeats,
    handleZoomOut,
    
}: PassedProps) => {
    const [isBottom, setIsBottom] = useState(false);
    const seatData = (Array.isArray(mapNavSeatData) && mapNavSeatData.length === 1) ? mapNavSeatData[0] : mapNavSeatData

    const handleScroll = (evt: React.UIEvent<HTMLDivElement>) => {
        const atBottom = evt.currentTarget.scrollHeight - evt.currentTarget.scrollTop === evt.currentTarget.clientHeight;
        setIsBottom(atBottom);
    }

    const handleClick = () => {
        handleZoomOut();
    }

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
                <>
                    {Array.isArray(seatData) ?
                        <ScrollChunkComponent
                            seatData={seatData}
                            handleModal={handleModal}
                            isBottom={isBottom}
                        /> :
                        <MapNavAccordion
                            key={seatData._id}
                            seatInfo={seatData}
                            handleModal={handleModal}
                        />
                    }
                    {(Array.isArray(seatData) && seatData.length === totalNumOfSeats) ?
                        null :
                        < Button onClick={handleClick}>Show All Seats</Button>
                    }
                </>
            </Flex >
        </>
    )
}

export default MapNav;