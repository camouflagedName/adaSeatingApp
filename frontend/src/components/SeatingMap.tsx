import { Text, Grid, GridItem, Center } from "@chakra-ui/react"
//import { useEffect, useState } from "react"
import MapSVG from "./SVGComponents/MapSVG";
import MapNav from "./MapNav";
import { ISeat } from "../utils/interfaces";
import { useState } from "react";
//import anthemMap from "../


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
                <MapNav seatData={sideBarData}/>
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