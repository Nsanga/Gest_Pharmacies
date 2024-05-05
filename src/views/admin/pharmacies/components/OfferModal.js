import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    Box,
    Input,
    useDisclosure,
    Textarea,
    Icon,
    Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const OfferModal = ({ loading, isEdit = false, selectedOffer, isOpen, onClose, onOpen, handleEditOffer, handleAddOffer }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    let handleNameChange = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
    }

    let handleDescriptionChange = (e) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    useEffect(() => {
        if (selectedOffer) {
            setName(selectedOffer.name || '');
            setDescription(selectedOffer.description || '');
        }
    }, [selectedOffer]);

    const handleEditClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleEditOffer(selectedOffer._id, { name, description });
    };

    const handleAddClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleAddOffer({ name, description });
        setName('');
        setDescription('');
        // onClose();
    };

    return (
        <Box>
            {!isEdit && (
                <Button
                    onClick={onOpen}
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    style={{ fontSize: "12px" }}
                >
                    AJOUTER
                </Button>
            )}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEdit ? "Modifier une offre" : "Ajouter une offre"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input ref={initialRef} placeholder="Nom de l'offer" value={name} onChange={handleNameChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder="Description de l'offre" value={description} onChange={handleDescriptionChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={isEdit ? handleEditClick : handleAddClick} isLoading={loading} disabled={!name || !description }>
                            {isEdit ? "Modifier" : "Ajouter"}
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default OfferModal;
