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
import { useDispatch } from "react-redux";
import { deleteService } from "redux/service/action";

const MedicamentDeleteModal = ({ service, isOpen, onClose, loading }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteService(service._id))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Suppression</ModalHeader>
                <ModalBody pb={6}>
                    <Text>Confirmez-vous la suppression de cette pharmacie?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleDelete} isLoading={loading} >Confirmer</Button>
                    <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MedicamentDeleteModal;
