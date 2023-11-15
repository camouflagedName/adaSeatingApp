import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'

const ModalComponent = ({ children, header, isOpen, onClose, handleModalClose}: { children: React.ReactNode, header: string, isOpen: boolean, onClose: () => void, handleModalClose: () => void }) => {

    const handleClick = () => {
        handleModalClose();
        onClose();
    }

    return (
        <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{header}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {children}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleClick}>
                                Save
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )
}

export default ModalComponent;