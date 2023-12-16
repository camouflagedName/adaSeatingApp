import { Box, Center } from "@chakra-ui/react";
import ModalComponent from "../ModalComponent"
import { ISeat } from "../../interfaces/interfaces";
import { ISeatMeta } from "../../interfaces/creatorInterfaces";
import { Fragment } from "react";
console.time('StaticImportTime');
import NavModalCheckBox from "./NavModalCheckbox";
console.timeEnd('StaticImportTime');


const NavSeatSelectorModal = ({ open, onClose, content, seatMeta }: { open: boolean, onClose: () => void, content: ISeat[], seatMeta: ISeatMeta }) => {

    const handleModalClose = () => {
    }

    return (
        <>
            <ModalComponent isOpen={open} onClose={onClose} header="Select Seats" handleModalClose={handleModalClose}>
                <Center>
                    <Box
                        display="flex"
                        flexDirection="column"
                        w='100%'
                        borderWidth='1px'
                        borderRadius='sm'
                        style={{
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: "10rem"
                        }}>
                        {content.map((seatInfo, index) => {
                            const id = seatInfo._id;
                            return (
                                <Fragment key={index}>
                                    <NavModalCheckBox seatInfo={seatInfo} seatMeta={seatMeta} id={id} />
                                </Fragment>
                            )
                        })}
                    </Box>
                </Center>
            </ModalComponent>
        </>
    )
}

export default NavSeatSelectorModal;