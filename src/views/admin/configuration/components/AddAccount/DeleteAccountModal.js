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
import { deleteUser } from "redux/user/action";

const MedecinDeleteModal = ({ user, isOpen, onClose, loading }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteUser(user._id))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Suppression</ModalHeader>
                <ModalBody pb={6}>
                    <Text>Confirmez-vous la suppression de ce compte?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleDelete} isLoading={loading} >Confirmer</Button>
                    <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MedecinDeleteModal;
