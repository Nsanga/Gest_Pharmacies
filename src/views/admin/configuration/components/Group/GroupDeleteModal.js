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
import { useDispatch } from "react-redux";
import { deleteGroup } from "redux/campagne/action";

const GroupDeleteModal = ({ group, isOpen, onClose, loading }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteGroup(group._id))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Suppression</ModalHeader>
                <ModalBody pb={6}>
                    <Text>Confirmez-vous la suppression de ce groupe?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleDelete} isLoading={loading} >Confirmer</Button>
                    <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GroupDeleteModal;
