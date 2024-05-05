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
    Textarea,
    RadioGroup,
    Stack,
    Radio,
    Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { InputGroup, InputLeftAddon } from "@chakra-ui/react";

const animatedComponents = makeAnimated();

const MedicamentModal = ({ offers, loading, isEdit = false, selectedService, isOpen, onClose, onOpen, handleEditService, handleAddService }) => {
    const [isGardeSelected, setIsGardeSelected] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState([]);
    const [previousSelectedOffer, setPreviousSelectedOffer] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() => {
        // Mettez à jour les champs du formulaire lorsque selectedService change
        if (selectedService) {
            setName(selectedService.name || '');
            setDescription(selectedService.description || '');

            // Créez un tableau d'objets représentant les offres
            const offersArray = selectedService.offers.map(offer => ({
                value: offer._id,
                label: offer.name
            }));

            setSelectedOffer(offersArray);
            setPreviousSelectedOffer(offersArray);
        }
    }, [selectedService]);

    const offer = offers?.map((ele) => {
        return {
            value: ele._id,
            label: ele.name
        }
    });

    let handleNameChange = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
    }

    let handleDescriptionChange = (e) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    const handleOfferChange = (selectedOptions) => {
        setSelectedOffer(selectedOptions);
    };

    const offerValues = selectedOffer.map((offer) => offer.value);

    const handleEditClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleEditService(selectedService._id, { name, description, offers: offerValues });
    };

    const handleAddClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleAddService({ name, description, offers: offerValues });
        setName('');
        setDescription('');
        setSelectedOffer([]);
    };

    const handleGardeChange = (value) => {
        setIsGardeSelected(value === '1');
    };

    const handleCloseModal = () => {
        if (selectedOffer.length !== previousSelectedOffer.length) {
            setSelectedOffer(previousSelectedOffer);
        }
        onClose();
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
                onClose={handleCloseModal}
                scrollBehavior='inside'
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEdit ? "Modifier un médicament" : "Ajouter un médicament"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex gap={4}>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input ref={initialRef} placeholder='Nom du médicament' value={name} onChange={handleNameChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Code</FormLabel>
                            <Input placeholder='Code du médicaments' value={name} onChange={handleNameChange} />
                        </FormControl>
                        </Flex>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder='Description du médicament' value={name} onChange={handleNameChange} />
                        </FormControl>

                        <Flex gap={4} mt={4}>
                        <FormControl>
                            <FormLabel>Dosage</FormLabel>
                            <Input placeholder='Dosage du médicament' value={name} onChange={handleNameChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Forme</FormLabel>
                            <Input placeholder='Forme du médicaments' value={name} onChange={handleNameChange} />
                        </FormControl>
                        </Flex>

                        <Flex gap={4} mt={4}>
                        <FormControl>
                            <FormLabel>Ingrédients actifs</FormLabel>
                            <Input placeholder='Ingrédients actifs du médicament' value={name} onChange={handleNameChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Instructions de dosage</FormLabel>
                            <Input placeholder='Instructions de dosage  du médicaments' value={name} onChange={handleNameChange} />
                        </FormControl>
                        </Flex>

                        <Flex gap={4} mt={4}>
                        <FormControl>
                            <FormLabel>Contre-indications</FormLabel>
                            <Input placeholder='Contre-indications du médicament' value={name} onChange={handleNameChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Effets secondaires</FormLabel>
                            <Input placeholder='Effets secondaires  du médicaments' value={name} onChange={handleNameChange} />
                        </FormControl>
                        </Flex>

                        <Flex gap={4} mt={4}>
                        <FormControl>
                            <FormLabel>Date d'expiration</FormLabel>
                            <Input placeholder="Date d'expiration du médicament" value={name} onChange={handleNameChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Fournisseur</FormLabel>
                            <Input placeholder='Fournisseur du médicaments' value={name} onChange={handleNameChange} />
                        </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Catégorie</FormLabel>
                            <Input placeholder='Catégorie du médicaments' value={name} onChange={handleNameChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={isEdit ? handleEditClick : handleAddClick} isLoading={loading} disabled={!name || !description || !selectedOffer.length}>
                            {isEdit ? "Modifier" : "Ajouter"}
                        </Button>
                        <Button colorScheme='red' onClick={handleCloseModal}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default MedicamentModal;
