import { MainFloorNonInteractive, SecondFloorNonInteractive, ThirdFloorNonInteractive } from "./NonInteractiveSections";

const SVGLayout = ({ tierA, tierC, secondFloorWings, thirdFloorWings }: 
    { tierA: React.ReactNode, tierC: React.ReactNode, secondFloorWings: React.ReactNode, thirdFloorWings: React.ReactNode }) => {

    return (
        <g id="BACKGROUND">
            <g id="LEVEL 1">
                <MainFloorNonInteractive />
                {tierA}
            </g>
            <g id="LEVEL 2">
                <SecondFloorNonInteractive />
                {secondFloorWings}
                {tierC}
            </g>
            <g id="LEVEL 3">
                <ThirdFloorNonInteractive />
                {thirdFloorWings}
            </g>
        </g>
    )
}

export default SVGLayout;