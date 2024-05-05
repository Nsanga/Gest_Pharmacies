// Chakra imports
import {
    Box,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
// Assets
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateGroup } from "redux/campagne/action";
import GroupDetailModal from "./GroupDetailsModal";
import GroupModal from "./GroupModal";
import GroupDeleteModal from "./GroupDeleteModal";
import { FaFilePdf } from "react-icons/fa";

export default function Group(props) {
    const { groups, users,  loading, ...rest } = props;
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedGroupEdit, setSelectedGroupEdit] = useState(null);
    const [selectedGroupDelete, setSelectedGroupDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    console.log("groupes du projet:", groups);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const handleGroupDeleteClick = (group) => {
        setSelectedGroupDelete(group);
    };

    const handleEditClick = (group) => {
        setSelectedGroupEdit(group);
        setIsModalOpen(true);
        console.log(group)
    };

    const handleCloseModal = () => {
        setSelectedGroup(null);
    };

    const handleEditGroup = (groupID, newData) => {
        dispatch(updateGroup(groupID, JSON.stringify(newData)));
    }

    useEffect(() => {
        if (!loading) {
            setIsModalOpen(false);
        }
    }, [loading]);

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const bg = useColorModeValue("white", "navy.700");
    const handleDownloadPDF = (pdfLink) => {
        // Vous pouvez effectuer ici toute logique nécessaire avant de télécharger le PDF, si nécessaire
        window.open(pdfLink, '_blank'); // Ouvre le lien dans une nouvelle fenêtre pour télécharger le PDF
    };
    return (
        <>
            {groups.map((group, index) => (
                <Card bg={bg} {...rest} p='14px'>
                    <Flex direction={{ base: "column", md: "row" }} alignItems='center' justifyContent='center' key={index}>
                        <Box mt={{ base: "10px", md: "0" }} onClick={() => handleGroupClick(group)} cursor="pointer">
                            <Text
                                color={textColorPrimary}
                                fontWeight='500'
                                fontSize='md'
                                mb='4px'>
                                {group.name}
                            </Text>
                            <Text
                                fontWeight='500'
                                color={textColorSecondary}
                                fontSize='sm'
                                me='4px'>
                                {group.description}
                            </Text>
                        </Box>
                        <Flex
                            me="16px"
                            ms="auto"
                            p="0px !important"
                            gap={4}
                        >
                            <Icon
                                as={MdEdit}
                                color='blue.500'
                                h='24px' w='24px'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleEditClick(group)}
                            />
                            <Icon
                                as={MdDelete}
                                color='red.500'
                                h='24px' w='24px'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleGroupDeleteClick(group)}
                            />
                            <Icon
                                as={FaFilePdf}
                                color='red.500'
                                h='24px'
                                w='24px'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDownloadPDF(`http://sonarqube.alaxione.fr:4500/api/v1/group/download?id=${group._id}`)}
                            />
                        </Flex>
                    </Flex>
                </Card>
            ))}
            {selectedGroup && (
                <GroupDetailModal group={selectedGroup} onClose={handleCloseModal} />
            )}
            {selectedGroupEdit && (
                <GroupModal
                    isEdit
                    selectedGroup={selectedGroupEdit}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    handleEditGroup={handleEditGroup}
                    loading={loading}
                    users={users} />
            )}
            {selectedGroupDelete && (
                <GroupDeleteModal
                    group={selectedGroupDelete}
                    onClose={() => setSelectedGroupDelete(null)}
                    isOpen={!!selectedGroupDelete}
                    loading={loading}
                />
            )}
        </>
    );
}
