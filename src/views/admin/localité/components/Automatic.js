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
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { IoRefreshCircleSharp } from "react-icons/io5";
// Assets
import { MdDelete, MdEdit } from "react-icons/md";
import CampagneDeleteModal from "./LocaliteDeleteModal";

export default function Automatic(props) {
    const { campaign,title, description, ranking, link, image, onClick, handleEditClick, handleDeleteClick, ...rest } = props;

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const brandColor = useColorModeValue("brand.500", "white");
    const bg = useColorModeValue("white", "navy.700");
    return (
        <Card bg={bg} {...rest} p='14px'>
            <Flex justifyContent='center' alignItems='center' direction={{ base: "column", md: "row" }}>
                <Box mt={{ base: "10px", md: "0" }}>
                    <Text
                        color={textColorPrimary}
                        fontWeight='500'
                        fontSize='md'
                        mb='4px'>
                        {title}
                    </Text>
                    <Text
                        fontWeight='500'
                        color={textColorSecondary}
                        fontSize='sm'
                        me='4px'>
                        {description}
                    </Text>
                </Box>
                <Flex
                    me='16px'
                    ms='auto'
                    p='0px !important'
                    gap={4} >
                    <Icon as={MdDelete} color='red.500' h='24px' w='24px' style={{ cursor: 'pointer' }} onClick={handleDeleteClick} />
                    <Icon as={MdEdit} color='blue.500' h='24px' w='24px' style={{ cursor: 'pointer' }} onClick={handleEditClick} />
                    <Icon as={FaFilePdf} color='red.500' h='24px' w='24px' style={{ cursor: 'pointer' }} />
                </Flex>
            </Flex>
            
        </Card>
    );
}
