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
    Flex,
    Icon,
} from "@chakra-ui/react";
import { FaRegCircleCheck } from "react-icons/fa6";

const MedicamentDetailModal = ({ service, onClose }) => {
    const { name, description, offers } = service;

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
                    {offers.map((offer) => (
                        <Flex key={offer._id} direction='column' gap={4}>
                            <Flex gap={4} alignItems='center'>
                                <Icon as={FaRegCircleCheck} color='blue.500' h='12px' w='12px' />
                                <Text>{offer.name}</Text>
                            </Flex>
                        </Flex>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={onClose}>Fermer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MedicamentDetailModal;
