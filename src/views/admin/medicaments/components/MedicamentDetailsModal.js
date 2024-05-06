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

const MedicamentDetailModal = ({ medicament, onClose }) => {
    const { name, price, pharmacies } = medicament;

    return (
        <Modal isOpen={true} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Prix du médicament: </Text>
                        <Text>{price}</Text>
                    </Flex>
                    <Box gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Pharmacie en possession de ce medicament: </Text>
                        {pharmacies.map((pharmacie) => (
                        <Flex key={pharmacie._id} direction='column' gap={4}>
                            <Flex gap={4} alignItems='center'>
                                <Icon as={FaRegCircleCheck} color='blue.500' h='12px' w='12px' />
                                <Text>{pharmacie.name}</Text>
                            </Flex>
                        </Flex>
                    ))}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={onClose}>Fermer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MedicamentDetailModal;
