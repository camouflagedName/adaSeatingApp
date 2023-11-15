import { Box, SimpleGrid, Editable, EditablePreview, EditableInput } from "@chakra-ui/react"
import ModalComponent from "./ModalComponent"
import { useState } from "react"
import { ISeat } from "../utils/interfaces"

const SeatDataModal = ({ isOpen, onClose, seatInfo }: { isOpen: boolean, onClose: () => void, seatInfo: ISeat | undefined }) => {
    const [textInput, setTextInput] = useState({})

    const handleTextInput = (key: string, value: string) => {
        setTextInput({ ...textInput, [key]: value })
    }

    const handleModalClose = () => {
        //submit textInput
    }

    return (
        <>
            {seatInfo &&
                <ModalComponent isOpen={isOpen} onClose={onClose} header="Update Seat Data" handleModalClose={handleModalClose}>
                    <Box w='100%' p={4} >
                        <SimpleGrid row={3} spacing={5}>
                            Section:
                            <Editable defaultValue={seatInfo.section} onChange={(text) => handleTextInput("section", text)}>
                                <EditablePreview />
                                <EditableInput />
                            </Editable>

                            <Box>
                                Row:
                                <Editable defaultValue={seatInfo.row} onChange={(text) => handleTextInput("row", text)}>
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                            </Box>
                            <Box>
                                Seat Number:
                                <Editable defaultValue={seatInfo.seatNumber.toString()} onChange={(text) => handleTextInput("seatNumber", text)}>
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </ModalComponent>
            }
        </>
    )
}

export default SeatDataModal;