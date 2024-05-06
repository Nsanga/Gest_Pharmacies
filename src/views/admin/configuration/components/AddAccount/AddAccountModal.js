// AddAccountModal.js
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';

const AddAccountModal = ({ isOpen, onClose, accountInfo, isEdit, onOpen }) => {
    const [formData, setFormData] = useState(accountInfo);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Logique de soumission du formulaire
    };

    return (
        <>
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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un compte</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Login:</FormLabel>
                            <Input type="text" id="login" name="login" onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Mot de passe:</FormLabel>
                            <Input type="password" id="password" name="password" onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirmation du mot de passe:</FormLabel>
                            <Input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Ajouter</Button>
                        <Button variant="ghost" onClick={onClose}>Fermer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
};

export default AddAccountModal;
