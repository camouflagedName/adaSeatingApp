import { Box, Center, Checkbox, SimpleGrid } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent"
import { useState } from "react";
import SelectableButton from "./SelectableButton";
import { ISeat } from "../utils/interfaces";
import { ISeatMeta } from "../utils/creatorInterfaces";

interface IButtons {
    [key: string]: string;
}

const NavSeatSelectorModal = ({ isOpen, onClose, handleClose, content, seatMeta, handleCheck }: { isOpen: boolean, onClose: () => void, handleClose: (data: string[]) => void, content: ISeat[], seatMeta: ISeatMeta, handleCheck: (evt: React.ChangeEvent<HTMLInputElement>, data: ISeat[]) => void }) => {
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
                <Checkbox onChange={(evt) => handleCheck(evt, [seatInfo])} isChecked={seatMeta[id].isSelected}>
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