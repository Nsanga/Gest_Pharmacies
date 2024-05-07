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
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { InputGroup, InputLeftAddon } from "@chakra-ui/react";

const animatedComponents = makeAnimated();

const PharmacieModal = ({ loading, isEdit = false, selectedPharmacie, isOpen, onClose, onOpen, handleEditPharmacie, handleAddService }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState(null);
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [localite, setLocalite] = useState(null);
    const [adresse, setAdresse] = useState('');
    const [openHour, setOpenHour] = useState('');
    const [closeHour, setCloseHour] = useState('');
    const [isEmergencyPharmacy, setIsEmergencyPharmacy] = useState(false);

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const fakeTypes = [
        { _id: 1, name: "Moderne" },
        { _id: 2, name: "Traditionnelle" },
    ];

    const typeOptions = fakeTypes.map((type) => ({
        value: type._id,
        label: type.name,
    }));

    const fakeLocalites = [
        { _id: 1, name: "Localité 1" },
        { _id: 2, name: "Localité 2" },
        { _id: 3, name: "Localité 3" },
        { _id: 4, name: "yaounde" },
    ];

    const localiteOptions = fakeLocalites.map((localite) => ({
        value: localite._id,
        label: localite.name,
    }));

    useEffect(() => {
        if (selectedPharmacie) {
            setName(selectedPharmacie.name || '');
            const foundType = typeOptions.find(type => type.label === selectedPharmacie.type);
            if (foundType) {
                setType(foundType);
            }
            setEmail(selectedPharmacie.email || '');
            setTelephone(selectedPharmacie.phone || '');
            const foundLocality = localiteOptions.find(locality => locality.label === selectedPharmacie.locality);
            if (foundLocality) {
                setLocalite(foundLocality);
            }
            setAdresse(selectedPharmacie.adress || '');
            setOpenHour(selectedPharmacie.OpenHour || '');
            setCloseHour(selectedPharmacie.CloseHour || '');
            setIsEmergencyPharmacy(selectedPharmacie.isEmergencyPharmacy || false);
        }
    }, [selectedPharmacie]);

    let handleNameChange = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
    }

    let handleTypeChange = (selectedOption) => {
        setType(selectedOption)
    }

    let handleEmailChange = (e) => {
        let inputValue = e.target.value
        setEmail(inputValue)
    }

    let handleTelephoneChange = (e) => {
        let inputValue = e.target.value
        setTelephone(inputValue)
    }

    let handleLocaliteChange = (selectedOption) => {
        setLocalite(selectedOption)
    }

    let handleAdresseChange = (e) => {
        let inputValue = e.target.value
        setAdresse(inputValue)
    }

    let handleOpenHourChange = (e) => {
        let inputValue = e.target.value
        setOpenHour(inputValue)
    }

    let handleCloseHourChange = (e) => {
        let inputValue = e.target.value
        setCloseHour(inputValue)
    }

    const handleGardeChange = (value) => {
        const newValue = value === '1';
        setIsEmergencyPharmacy(newValue);
    };

    const handleEditClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleEditPharmacie(selectedPharmacie._id, {
            name,
            type: type.label,
            email,
            phone: telephone,
            locality: localite.label,
            adress: adresse,
            OpenHour: openHour,
            CloseHour: closeHour,
            isEmergencyPharmacy
        });
    };

    const handleAddClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleAddService({
            name,
            type: type.label,
            email,
            phone: telephone,
            locality: localite.label,
            adress: adresse,
            OpenHour: openHour,
            CloseHour: closeHour,
            isEmergencyPharmacy
        });
        setName('');
        setType('');
        setEmail('');
        setTelephone('');
        setLocalite('');
        setAdresse('');
        setOpenHour('');
        setCloseHour('')
        setIsEmergencyPharmacy(false);
    };

    const handleCloseModal = () => {
        onClose();
    };

    const handleDownloadPDF = (pdfLink) => {
        // Vous pouvez effectuer ici toute logique nécessaire avant de télécharger le PDF, si nécessaire
        window.open(pdfLink, '_blank'); // Ouvre le lien dans une nouvelle fenêtre pour télécharger le PDF
    };

    return (
        <Box>
            {!isEdit && (
                <Flex gap={4}>
                    <Button
                        onClick={() => handleDownloadPDF(`http://sonarqube.alaxione.fr:4040/api/v1/pharmacie/download?`)}
                        leftIcon={<DownloadIcon />}
                        colorScheme="red"
                        style={{ fontSize: "12px" }}
                    >
                        Télécharger
                    </Button>
                    <Button
                        onClick={onOpen}
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        style={{ fontSize: "12px" }}
                    >
                        AJOUTER
                    </Button>
                </Flex>
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
                            <FormLabel>Type</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez le type de pharmacie'
                                value={type}
                                onChange={handleTypeChange}
                                options={typeOptions}
                                components={animatedComponents}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email du pharmacien' value={email} onChange={handleEmailChange} type="email" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Téléphone</FormLabel>
                            <Input placeholder='Téléphone du pharmacien' value={telephone} onChange={handleTelephoneChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Localité</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez la localité'
                                value={localite}
                                onChange={handleLocaliteChange}
                                options={localiteOptions}
                                components={animatedComponents}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Adresse</FormLabel>
                            <Input placeholder='Adresse de la pharmacie' value={adresse} onChange={handleAdresseChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Heure d'ouverture</FormLabel>
                            <InputGroup >
                                <InputLeftAddon children="Ouverture" />
                                <Input type="time" onChange={handleOpenHourChange} value={openHour} />
                            </InputGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Heure de fermeture</FormLabel>
                            <InputGroup >
                                <InputLeftAddon children="Fermeture" />
                                <Input type="time" onChange={handleCloseHourChange} value={closeHour} />
                            </InputGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>pharmacies de garde?</FormLabel>
                            <RadioGroup value={isEmergencyPharmacy ? '1' : '2'} onChange={handleGardeChange}>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='blue' value='1'>
                                        Oui
                                    </Radio>
                                    <Radio colorScheme='red' value='2'>
                                        Non
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={isEdit ? handleEditClick : handleAddClick} isLoading={loading} disabled={!name || !type || !email || !telephone || !localite || !adresse || !openHour || !closeHour}>
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
