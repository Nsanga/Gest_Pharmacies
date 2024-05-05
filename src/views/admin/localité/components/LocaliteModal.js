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
} from "@chakra-ui/react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function LocaliteModal({ groups,loading, isManual = true, title, isOpen, onOpen, onClose, campaign, label, handleEditCampaign, handleAddCampaign, type }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [period, setPeriod] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [previousGroup, setPreviousGroup] = useState([]);

    useEffect(() => {
        if (campaign) {
            setName(campaign.name || '');
            setDescription(campaign.description || '');
            const foundPeriod = periodList.find(p => p.value === p.value);
            if (foundPeriod) {
                setPeriod(foundPeriod); 
            }
            const groupsArray = campaign.groups.map(group => ({
                value: group._id,
                label: group.name
            }));
    
            setSelectedGroup(groupsArray);
            setPreviousGroup(groupsArray);
        }
    }, [campaign]);

    const groupForm = groups?.map((ele) => {
        return {
            value: ele._id,
            label: ele.name
        }
    });
const handleGroupChange = (selectedOptions) => {
    setSelectedGroup(selectedOptions);
    };
const groupValues = selectedGroup.map((group) => group.value);

    let handleNameChange = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
    }

    let handleDescriptionChange = (e) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    let handlePeriodChange = (selectedOption) => {
        setPeriod(selectedOption); 
    }

    const handleEditClick = () => {
        handleEditCampaign(campaign._id, { name, description, period, groups: groupValues, type });
        if (selectedGroup.length !== previousGroup.length) {
            setSelectedGroup(previousGroup);
        }
    };

    const handleAddClick = () => {
        if (isManual) {
            handleAddCampaign({ name, description, groups: groupValues, type });
            setName('');
            setDescription('');
            setSelectedGroup([]);
            // onClose();
        } else {
            handleAddCampaign({ name, description, period, groups: groupValues, type });
            setName('');
            setDescription('');
            setPeriod('');
            setSelectedGroup([]);
            // onClose();
        }
    };

    const periodList = [
        { value: 'daily', label: 'Journalier' },
        { value: 'weekly', label: 'Hebdomadaire' },
        { value: 'monthly', label: 'Mensuel' }
    ];

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <Box >
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Titre</FormLabel>
                            <Input ref={initialRef} placeholder='Titre de la campagne' value={name} onChange={handleNameChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder='Description de la campagne' value={description} onChange={handleDescriptionChange} />
                        </FormControl>
                        {!isManual && (
                            <FormControl mt={4}>
                                <FormLabel>Périodicité</FormLabel>
                                <Select
                                    variant='filled'
                                    placeholder='Sélectionnez la période de la campagne'
                                    value={period}
                                    isMulti={false}
                                    onChange={handlePeriodChange}
                                    options={periodList}
                                    components={animatedComponents}
                                />
                            </FormControl>
                        )}
                        <FormControl mt={4}>
                            <FormLabel>Groupe</FormLabel>
                            <Select
                                variant='filled'
                                placeholder='Sélectionnez les groupes'
                                value={selectedGroup}
                                isMulti
                                onChange={handleGroupChange}
                                options={groupForm}
                                components={animatedComponents}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={label === 'Modifier' ? handleEditClick : handleAddClick} isLoading={loading} disabled={!name || !description || (!isManual && (!period || !period.value)) || !selectedGroup.length}>
                            {label}
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
