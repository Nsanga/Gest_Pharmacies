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

const MedicamentsModal = ({ pharmacies, loading, isEdit = false, selectedMedicament, isOpen, onClose, onOpen, handleEditMedicament, handleAddMedicament }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedPharmacie, setSelectedPharmacie] = useState([]);
    const [previousSelectedPharmacie, setPreviousSelectedPharmacie] = useState([]);

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() => {
        if (selectedMedicament) {
            setName(selectedMedicament.name || '');
            setPrice(selectedMedicament.price || '');
            const pharmacieArray = selectedMedicament.pharmacies.map(pharmacie => ({
                value: pharmacie._id,
                label: pharmacie.name
            }));

            setSelectedPharmacie(pharmacieArray);
            setPreviousSelectedPharmacie(pharmacieArray);
        }
    }, [selectedMedicament]);

    const pharmacie = pharmacies?.map((ele) => {
        return {
            value: ele._id,
            label: ele.name
        }
    });

    let handleNameChange = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
    }

    let handlePriceChange = (e) => {
        let inputValue = e.target.value
        setPrice(inputValue)
    }

    const handlePharmacieChange = (selectedOptions) => {
        setSelectedPharmacie(selectedOptions);
    };

    const pharmacieValues = selectedPharmacie.map((pharmacie) => pharmacie.value);

    const handleEditClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleEditMedicament(selectedMedicament._id, {
            name,
            price,
            pharmacies: pharmacieValues,
        });
    };

    const handleAddClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleAddMedicament({
            name,
            price,
            pharmacies: pharmacieValues,
        });
        setName('');
        setPrice('');
        setSelectedPharmacie([]);
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
                        onClick={() => handleDownloadPDF(`http://sonarqube.alaxione.fr:4040/api/v1/medicament/download?`)}
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
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEdit ? "Modifier une pharmacie" : "Ajouter une pharmacie"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input ref={initialRef} placeholder='Nom du medicament' value={name} onChange={handleNameChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Prix</FormLabel>
                            <Input placeholder='Prix du medicament' value={price} onChange={handlePriceChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Pharmacies</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez les pharmacies'
                                value={selectedPharmacie}
                                isMulti
                                onChange={handlePharmacieChange}
                                options={pharmacie}
                                components={animatedComponents}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={isEdit ? handleEditClick : handleAddClick} isLoading={loading} disabled={!name || !price || !selectedPharmacie.length}>
                            {isEdit ? "Modifier" : "Ajouter"}
                        </Button>

                        <Button colorScheme='red' onClick={handleCloseModal}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default MedicamentsModal;
