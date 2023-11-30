import { Box, SimpleGrid } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent"
import { useState } from "react";
import SelectableButton from "./SelectableButton";

interface IButtons {
    [key: string]: string;
}

const SeatNotesModal = ({ isOpen, onClose, handleClose }: { isOpen: boolean, onClose: () => void, handleClose: (data: string[]) => void }) => {
    const [patronNeeds, setPatronNeeds] = useState<string[]>([])

    const handleClick = (value: string, selected: boolean) => {
        if (selected) setPatronNeeds([...patronNeeds, value])
        else setPatronNeeds(prev => {
            const copyPrevious: string[] = [...prev]
            if (copyPrevious.includes(value)) {
                const index = copyPrevious.indexOf(value);
                const deletedArray = copyPrevious.splice(index, 1);
                console.log(deletedArray)
            }
            
            return copyPrevious
        })
    }

    const buttons: IButtons = {
        mobileDevice: "Mobile Device",
        stairs: "No Stairs",
        walkingDevice: "Walking Device",
        standing: "Cannot Stand",
        walking: "Limit Walking",
        emt: "EMT Access",
        space: "Uncrowded",
        injury: "Injured",
        pregnant: "Pregnant",
        other: "Other Health Issue"
    }

    const buttonsArr: React.ReactElement[] = []

    for (const key in buttons) {
        if (Object.prototype.hasOwnProperty.call(buttons, key)) {
            const value = buttons[key as keyof typeof buttons];
            buttonsArr.push(
                <SelectableButton key={key} id={key} label={value} updateSelection={handleClick} />
            )
        }
    }

    const handleModalClose = () => {
        handleClose(patronNeeds)
    }

    return (
        <>
            <ModalComponent isOpen={isOpen} onClose={onClose} header="Notes" handleModalClose={handleModalClose}>
                <Box>
                    <SimpleGrid columns={3} row={4} spacing={5}>
                        {buttonsArr}
                    </SimpleGrid>
                </Box>
            </ModalComponent>
        </>
    )
}

export default SeatNotesModal;