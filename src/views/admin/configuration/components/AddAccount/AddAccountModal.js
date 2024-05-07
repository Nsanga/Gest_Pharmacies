// AddAccountModal.js
import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { IoEye, IoEyeOff } from 'react-icons/io5'

const AddAccountModal = ({ loading, isOpen, onClose, selectedUser, isEdit, onOpen, handleEditUser, handleAddUser }) => {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (selectedUser) {
            setUsername(selectedUser.username || '');
        }
    }, [selectedUser]);

    const handleClick = () => setShow(!show)

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleEditClick = () => {
        handleEditUser(selectedUser._id, {
            username,
            password,
        });
    };

    const handleAddClick = () => {
        handleAddUser({
            username,
            password,
        });
        setUsername('');
        setPassword('');
    };

    const handleCloseModal = () => {
        onClose();
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
                    <ModalHeader>{isEdit ? "Modifier un compte" : "Ajouter un compte"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nom d'utilisateur:</FormLabel>
                            <Input type="text" value={username} placeholder="Entrer le nom d'utilisateur" onChange={handleChangeUsername} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Mot de passe</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Entrer le mot de passe'
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? <IoEyeOff /> : <IoEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={isEdit ? handleEditClick : handleAddClick} isLoading={loading} disabled={!username || !password}>
                            {isEdit ? "Modifier" : "Ajouter"}
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>Fermer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
};

export default AddAccountModal;
