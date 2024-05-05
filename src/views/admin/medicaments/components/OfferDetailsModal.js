import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Box,
    Text,
} from "@chakra-ui/react";

const OfferDetailModal = ({ offer, onClose }) => {
    const { name, description } = offer;

    return (
        <Modal isOpen={true} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Box style={{ marginBottom: 12 }}>
                        <Text>{description}</Text>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={onClose}>Fermer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default OfferDetailModal;
