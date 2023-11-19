import { Box, Center, Checkbox } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent"
import { ISeat } from "../interfaces/interfaces";
import { ISeatMeta } from "../interfaces/creatorInterfaces";
import handleCheck from "../utils/handleCheck";


const NavSeatSelectorModal = ({ isOpen, onClose, content, seatMeta, handleSelectedSeatCheck }: { isOpen: boolean, onClose: () => void, content: ISeat[], seatMeta: ISeatMeta, handleSelectedSeatCheck: (param: object) => void }) => {
    /*     
    const buttonTitleArray = [
            "Mobile Device",
            "No Stairs",
            "Walking Device",
            "Cannot Stand",
            "Limit Walking",
            "EMT Access",
            "Uncrowded",
            "Injured",
            "Pregnant",
            "Other Health Issue"
        ]
    
        const buttonMap = buttonTitleArray.map(title => <SelectableButton id={title} label={title} updateSelection={handleClick} /> )
     */


    //const buttonsArr: React.ReactElement[] = []

    /*     for (const key in buttons) {
            if (Object.prototype.hasOwnProperty.call(buttons, key)) {
                const value = buttons[key as keyof typeof buttons];
                buttonsArr.push(
                    <SelectableButton id={key} label={value} updateSelection={handleClick} />
                )
            }
        } */

    const contentArray = content.map(seatInfo => {
        const id = seatInfo._id;
        return (
            <Center>
                <Checkbox onChange={(evt) => handleCheck(evt, [seatInfo], handleSelectedSeatCheck)} isChecked={seatMeta[id].isSelected}>
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