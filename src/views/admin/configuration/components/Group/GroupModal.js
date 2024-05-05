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

const animatedComponents = makeAnimated();

const GroupModal = ({ users, loading, isEdit = false, selectedGroup, isOpen, onClose, onOpen, handleEditGroup, handleAddGroup }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedMember, setSelectedMember] = useState([]);
    const [previousMember, setPreviousMember] = useState([]);

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
        if (selectedGroup) {
            setName(selectedGroup.name || '');
            setDescription(selectedGroup.description || '');
            const membersArray = selectedGroup.members.map(member => ({
                value: member._id,
                label: member.pseudo
            }));

            setSelectedMember(membersArray);
            setPreviousMember(membersArray);
        }
    }, [selectedGroup]);

    const memberForm = users?.map((ele) => {
        return {
            value: ele._id,
            label: ele.pseudo
        }
    });
    const handleMemberChange = (selectedOptions) => {
        setSelectedMember(selectedOptions);
    };
    const memberValues = selectedMember.map((member) => member.value);

    const handleEditClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleEditGroup(selectedGroup._id, { name, description, members: memberValues });
        if (selectedMember.length !== previousMember.length) {
            setSelectedMember(previousMember);
        }
    };

    const handleAddClick = () => {
        // Appeler la fonction handleEdit et passer les valeurs de title et description
        handleAddGroup({ name, description, members: memberValues });
        setName('');
        setDescription('');
        setSelectedMember([]);
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
                    <ModalHeader>{isEdit ? "Modifier un groupe" : "Ajouter un groupe"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input ref={initialRef} placeholder="Nom du groupe" value={name} onChange={handleNameChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder="Description du groupe" value={description} onChange={handleDescriptionChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Membres</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez les offres'
                                value={selectedMember}
                                isMulti
                                onChange={handleMemberChange}
                                options={memberForm}
                                components={animatedComponents}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={isEdit ? handleEditClick : handleAddClick} isLoading={loading} disabled={!name || !description}>
                            {isEdit ? "Modifier" : "Ajouter"}
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default GroupModal;
