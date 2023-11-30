import { Grid, GridItem } from "@chakra-ui/react"
//import { useEffect, useState } from "react"
//import anthemMap from "../


const SeatingMapLayout = ({ children }: {children: React.ReactNode}) => {

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
                { children }
            </Grid >
        </>
    )
}

const Header = ({ children }: { children: React.ReactNode }) => (
    <GridItem area={"header"}>{children}</GridItem>
);
const Main = ({ children }: { children: React.ReactNode }) => (
    <GridItem area={"main"}>{children}</GridItem>
);
const Nav = ({ children }: { children: React.ReactNode }) => (
    <GridItem area={"nav"}>{children}</GridItem>
);
const Footer = ({ children }: { children: React.ReactNode }) => (
    <GridItem area={"footer"}>{children}</GridItem>
);

SeatingMapLayout.Header = Header;
SeatingMapLayout.Main = Main;
SeatingMapLayout.Nav = Nav;
SeatingMapLayout.Footer = Footer;
export default SeatingMapLayout;