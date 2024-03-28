import { Grid, GridItem } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
//import { useEffect, useState } from "react"
//import anthemMap from "../


const SeatingMapLayout = ({ children, isLive }: { children: React.ReactNode, isLive?: boolean }) => {

    const gridTemplateAreasLive =
        `"header"
    "main"
    "main"
    "main"
    "nav"
    "nav"
    "nav"
    "nav"
    "nav"`;

    const gridTemplateAreasCreator =
        `"header"
    "main"
    "main"
    "main"
    "main"
    "nav"
    "nav"
    "nav"
    "footer"`

    return (
        <>
            <Grid
                style={{ touchAction: 'none' }}
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
                        gridTemplateAreas: isLive ? gridTemplateAreasLive : gridTemplateAreasCreator,
                    },
                }}
            >
                {children}
            </Grid >
        </>
    )
}

const Header = ({ children }: { children: React.ReactNode }) => (
    <GridItem area={"header"}>{children}</GridItem>
);
const Main = ({ children, setHeight }: { children: React.ReactNode, setHeight: (height: number) => void }) => {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainRef.current) {
            const height = mainRef.current.clientHeight;
            setHeight(height);
        }
    }, [setHeight]);

    return (
        <GridItem ref={mainRef} area={"main"}>{children}</GridItem>
    )
};
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