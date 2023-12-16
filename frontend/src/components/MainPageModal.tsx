import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, ModalFooter, Button } from "@chakra-ui/react"


const MainPageModal = ({ header, children, buttonLabel, isDisabled, handleClose }: { header: string, children: React.ReactElement, buttonLabel: string, isDisabled: boolean, handleClose: () => void }) => {

    const handleClick = () => {
        handleClose();
    }

    return (
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                        {children}
                    </Center>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClick} isDisabled={isDisabled}>{buttonLabel}</Button>
                </ModalFooter>
            </ModalContent>
    )
}

export default MainPageModal;