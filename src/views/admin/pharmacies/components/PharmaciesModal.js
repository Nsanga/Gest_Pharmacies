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

const PharmacieModal = ({ offers, loading, isEdit = false, selectedService, isOpen, onClose, onOpen, handleEditService, handleAddService }) => {
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
                    <ModalHeader>{isEdit ? "Modifier une pharmacie" : "Ajouter une pharmacie"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input ref={initialRef} placeholder='Nom de la pharmacie' value={name} onChange={handleNameChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Localité</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez les localités'
                                value={selectedOffer}
                                isMulti
                                onChange={handleOfferChange}
                                options={offer}
                                components={animatedComponents}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Liste des médicaments</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez les medicaments disponibles'
                                value={selectedOffer}
                                isMulti
                                onChange={handleOfferChange}
                                options={offer}
                                components={animatedComponents}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <Flex>
                                <FormLabel>pharmacies de garde?</FormLabel>
                                <RadioGroup defaultValue='2' onChange={handleGardeChange}>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='blue' value='1'>
                                            Oui
                                        </Radio>
                                        <Radio colorScheme='red' value='2'>
                                            Non
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </Flex>
                        </FormControl>

                        {isGardeSelected && (
                            <FormControl mt={4}>
                                <FormLabel>Plages horaires de garde</FormLabel>
                                <Flex alignItems='center' justifyContent='center' gap={4}>
                                    <InputGroup >
                                        <InputLeftAddon children="Début" />
                                        <Input type="time" />
                                    </InputGroup>
                                    <InputGroup >
                                        <InputLeftAddon children="Fin" />
                                        <Input type="time" />
                                    </InputGroup>
                                </Flex>
                            </FormControl>
                        )}
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

export default PharmacieModal;
