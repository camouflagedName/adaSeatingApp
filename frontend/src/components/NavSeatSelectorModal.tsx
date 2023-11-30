import { Box, Center, Checkbox } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent"
import { ISeat } from "../interfaces/interfaces";
import { ISeatMeta } from "../interfaces/creatorInterfaces";
import handleCheck from "../utils/handleCheck";


const NavSeatSelectorModal = ({ isOpen, onClose, content, seatMeta, handleSelectedSeatCheck }: { isOpen: boolean, onClose: () => void, content: ISeat[], seatMeta: ISeatMeta, handleSelectedSeatCheck: (param: object) => void }) => {

    const contentArray = content.map(seatInfo => {
        const id = seatInfo._id;
        return (
            <Center>
                <Checkbox onChange={(evt) => handleCheck(evt, [seatInfo], handleSelectedSeatCheck)} isChecked={seatMeta[id]} >
                    {seatInfo.seatNumber}
                </Checkbox>
            </Center>
        )
    })

    const handleModalClose = () => {
        //handleClose(patronNeeds)
    }

    return (
        <>
            <ModalComponent isOpen={isOpen} onClose={onClose} header="Select Seats" handleModalClose={handleModalClose}>
                <Center>
                    <Box
                        display="flex" flexDirection="column"
                        w='100%'
                        borderWidth='1px'
                        borderRadius='sm'
                        style={{
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: "10rem"
                        }}>

                        {contentArray}

                    </Box>
                </Center>
            </ModalComponent>
        </>
    )
}

export default NavSeatSelectorModal;