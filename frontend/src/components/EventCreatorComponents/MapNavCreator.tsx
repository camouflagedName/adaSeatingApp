import { Flex, useDisclosure } from "@chakra-ui/react"
import { ISeat } from "../../interfaces/interfaces";
import { useContext, useState } from "react";
import { IAppEventCreatorData, ISeatMeta } from "../../interfaces/creatorInterfaces";
import { EventCreator } from "../../context/context";
import MapNavCreatorAccordion from "./MapNavCreatorAccordion";
import NavSeatSelectorModal from "./NavSeatSelectorModal";

const MapNavCreator = ({ seatMeta }: { seatMeta: ISeatMeta }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contextData = useContext(EventCreator);
    const { sortedSeatData } = contextData as IAppEventCreatorData;
    const [modalContent, setModalContent] = useState<ISeat[]>([]);
    const { tierARowA, tierARowB, tierCLeft, tierCLeftCenter, tierCRight, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;

    const tierA = { "Row A": tierARowA, "Row B": tierARowB };
    const secondFloor = { "2nd Floor Right Wing": secondRightWing, "2nd Floor Left Wing": secondLeftWing };
    const tierCSections = [...tierCRight, ...tierCRightCenter, ...tierCLeft, ...tierCLeftCenter];
    const tierC = { "Tier C": tierCSections };
    const thirdFloor = { "3rd Floor Right Wing": thirdRightWing, "3rd Floor Left Wing": thirdLeftWing };
    const allSectionsArray = [tierA, secondFloor, tierC, thirdFloor]

    const handleModalBtnClick = (content: ISeat[]) => {
        setModalContent(content);
        onOpen();
    }

    return (
        <>
            <Flex id="navContainer" direction="column" borderWidth="1px" borderRadius={"sm"} style={{ position: 'relative', height: "100%", overflow: 'auto' }}>
                {allSectionsArray.map((section, index) => {
                    let label = '';
                    switch (index) {
                        case 0:
                            label = "Tier A";
                            break;
                        case 1:
                            label = "2nd Floor";
                            break;
                        case 2:
                            label = "Tier C";
                            break;
                        case 3:
                            label = "3rd Floor";
                            break;
                    }
                    return <MapNavCreatorAccordion key={index} title={label} section={section} seatMeta={seatMeta} handleModalBtnClick={handleModalBtnClick}/>
                })}
            </Flex>
            <NavSeatSelectorModal open={isOpen} onClose={onClose} content={modalContent} seatMeta={seatMeta} />
        </>
    )
}

export default MapNavCreator;