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

const PharmacieDetailModal = ({ pharmacie, onClose }) => {
    const { name, type, email, phone, locality, adress, OpenHour, CloseHour, isEmergencyPharmacy } = pharmacie;

    return (
        <Modal isOpen={true} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Type de pharmacie: </Text>
                        <Text>{type}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                        <Text>{email}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Téléphone: </Text>
                        <Text>{phone}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Localité: </Text>
                        <Text>{locality}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Adresse: </Text>
                        <Text>{adress}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Heure d'ouverture: </Text>
                        <Text>{OpenHour}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Heure de fermeture: </Text>
                        <Text>{CloseHour}</Text>
                    </Flex>
                    <Flex gap={4} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold' }}>Pharmacie de garde? </Text>
                        <Text>{isEmergencyPharmacy === true ? 'Oui' : 'Non'}</Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={onClose}>Fermer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PharmacieDetailModal;
