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
import { deleteCampaign } from "redux/campagne/action";

const LocalitéDeleteModal = ({ campaign, isOpen, onClose, loading, type }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteCampaign(campaign._id, type))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Suppression</ModalHeader>
                <ModalBody pb={6}>
                    <Text>Confirmez-vous la suppression de cette campagne?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleDelete} isLoading={loading}>Confirmer</Button>
                    <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default LocalitéDeleteModal;
