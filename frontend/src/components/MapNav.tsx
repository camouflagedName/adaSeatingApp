import { Box, Flex, SimpleGrid, TabList, Tabs } from "@chakra-ui/react"
import { ISeat } from "../interfaces/interfaces";
import { useRef } from "react";
import CustomizedTab from "./CustomComponents/CustomizedTab";
import MapNavSeatDisplay from "./LiveEventComponents/MapNavSeatDisplay";

interface PassedProps {
    mapNavSeatData: ISeat[] | ISeat | undefined,
    handleModal: (param: ISeat) => void;
    totalNumOfSeats: number;
    handleZoomOut: () => void;
    setMapLocation: (index: number) => void;
}

const MapNav = ({
    mapNavSeatData,
    setMapLocation

}: PassedProps) => {
    //const [isBottom, setIsBottom] = useState(false);

    const topBoxRef = useRef<HTMLDivElement>(null);
    //const seatData = (Array.isArray(mapNavSeatData) && mapNavSeatData.length === 1) ? mapNavSeatData[0] : mapNavSeatData;
    /*
        const handleScroll = (evt: React.UIEvent<HTMLDivElement>) => {
             const atBottom = evt.currentTarget.scrollHeight - evt.currentTarget.scrollTop === evt.currentTarget.clientHeight;
            setIsBottom(atBottom); 
        }
    */


    // set height of header box

    return (
        <>
            <Flex id="navContainer" direction="column" borderWidth="1px" borderRadius={"sm"} >
                <Box ref={topBoxRef} w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'white'} color={'blue.600'} style={{ top: 0, padding: '0px' }}>
                    <Tabs variant='enclosed' colorScheme='blue' onChange={setMapLocation} size="sm" align="center" isFitted defaultIndex={6}>
                        <TabList style={{ overflow: 'auto', width: '100%' }}>
                            <CustomizedTab text="Tier A" />
                            <CustomizedTab text="Tier C" />
                        </TabList>
                        <TabList style={{ overflow: 'auto', width: '100%' }}>
                            <CustomizedTab text="2nd Right" />
                            <CustomizedTab text="2nd Left" />
                            <CustomizedTab text="3rd Right" />
                            <CustomizedTab text="3rd Left" />
                        </TabList>
                        <TabList style={{ overflow: 'auto', width: '100%' }}>
                            <CustomizedTab text="All" />
                        </TabList>
                    </Tabs>
                </Box>

                {(Array.isArray(mapNavSeatData) && mapNavSeatData.length > 0) &&
                    <>
                        <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} >
                            <SimpleGrid columns={3} spacing={10} >
                                <Box>SEC</Box>
                                <Box>ROW</Box>
                                <Box>NUM</Box>
                            </SimpleGrid>
                        </Box>
                        <MapNavSeatDisplay seatData={mapNavSeatData} />
                    </>
                }

            </Flex >
        </>
    )
}

export default MapNav;


/*

                            {
                                Array.isArray(seatData) ?
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

*/

/*


                        <>
                            {
                                Array.isArray(mapNavSeatData) ?
                                    <MapNavSeatDisplay
                                        seatData={mapNavSeatData}
                                    /> :
                                    <MapNavAccordion
                                        key={mapNavSeatData._id}
                                        seatInfo={mapNavSeatData}
                                        handleModal={handleModal}
                                    />
                            }
                            {
                                (Array.isArray(mapNavSeatData) && mapNavSeatData.length === totalNumOfSeats) ?
                                    null :
                                    < Button onClick={handleClick}>Show All Seats</Button>
                            }
                        </>

*/