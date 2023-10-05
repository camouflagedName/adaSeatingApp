import { Text, Grid, GridItem, Center } from "@chakra-ui/react"
//import { useEffect, useState } from "react"
import MapSVG from "./SVGComponents/MapSVG";
import MapNav from "./MapNav";
import { ISeat } from "../utils/interfaces";
import { useState } from "react";
//import anthemMap from "../

const seatList: ISeat[] = [
    {
        _id: "seatId_1",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 101,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_2",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 102,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_3",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 103,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_4",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 104,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_5",
        eventId: "eventId_test",
        floor: 1,
        section: "TierC",
        row: "A",
        seatNumber: 101,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_6",
        eventId: "eventId_test",
        floor: 1,
        section: "TierC",
        row: "A",
        seatNumber: 102,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_7",
        eventId: "eventId_test",
        floor: 1,
        section: "TierC",
        row: "A",
        seatNumber: 103,
        available: true,
        inPlay: true,
    },
    {
        _id: "seatId_8",
        eventId: "eventId_test",
        floor: 1,
        section: "TierC",
        row: "A",
        seatNumber: 104,
        available: true,
        inPlay: true,
    },

]

const SeatingMap = ({ seatData }: { seatData: ISeat[] }) => {
    const [sideBarData, setSideBarData] = useState<ISeat[]>(seatData);

    const updateSideBarNav = (data: ISeat) => {
        setSideBarData([data]);
    }


    return (
        <Grid
            css={{
                "@media (min-width: 768px)": {
                    /* Styles for larger screens (e.g., desktop) */
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gridTemplateRows: "repeat(8, 1fr)",
                    height: "100vh",
                    gridTemplateAreas: 
                    `"header header header header header" 
                    "main main main main nav"
                    "main main main main nav"
                    "main main main main nav"
                    "main main main main nav"
                    "main main main main nav"
                    "main main main main nav"
                    "footer footer footer footer footer"`
                },
                "@media (max-width: 767px)": {
                    /* Styles for small screens (e.g., mobile) */
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "repeat(9, 1fr)",
                    height: "100vh",
                    gridTemplateAreas:
                    `"header"
                    "main"
                    "main"
                    "main"
                    "main"
                    "nav"
                    "nav"
                    "nav"
                    "footer"`
                },
            }}
        >
            <GridItem area={"header"}>
                <Center style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Text fontSize='4xl'>ADA Seating</Text>
                </Center>
            </GridItem>
            <GridItem area={"main"}>
                <MapSVG update={updateSideBarNav} />
            </GridItem>
            <GridItem area={"nav"}>
                <MapNav seatData={seatData}/>
            </GridItem>
            <GridItem area={"footer"}>
            </GridItem>
        </Grid >
    )
}

export default SeatingMap;

/*

        <Grid
            templateAreas={`"header header header header header" 
                            "main main main main nav" 
                            "footer footer footer footer nav"`}
            gridTemplateRows={"1fr 1fr 1fr"}
            gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"}
            h={"100vh"}

        >
            <GridItem area={"header"}>
                <Center style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Text fontSize='4xl'>Title</Text>
                </Center>
            </GridItem>
            <GridItem area={"main"}>
                <MapSVG />
            </GridItem>
            <GridItem area={"nav"}>
                <MapNav />
            </GridItem>
        </Grid >

*/