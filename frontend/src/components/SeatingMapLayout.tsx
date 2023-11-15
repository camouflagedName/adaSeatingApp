import { Text, Grid, GridItem, Center, Button } from "@chakra-ui/react"
//import { useEffect, useState } from "react"
import { ISeat } from "../utils/interfaces";

//import anthemMap from "../


const SeatingMapLayout = ({ seatData, mode, svg, nav, title, footer }: { seatData: ISeat[], mode: string, svg: React.ReactNode, nav: React.ReactNode, title: React.ReactNode, footer: React.ReactNode }) => {


    return (
        <>
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

                    {
                        mode === 'create' ? title : (
                            <Center style={{ height: "100%", }}>
                                <Text fontSize='4xl'>ADA Seating</Text>
                            </Center>
                        )
                    }
                </GridItem>
                <GridItem area={"main"}>
                    {svg}
                </GridItem>
                <GridItem area={"nav"}>
                    {nav}
                </GridItem>
                <GridItem area={"footer"}>
                    {mode === "create" ? footer : null}
                </GridItem>
            </Grid >
        </>
    )
}

export default SeatingMapLayout;

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