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
import OfferDetailModal from "./OfferDetailsModal";
import OfferModal from "./OfferModal";
import OfferDeleteModal from "./OfferDeleteModal";
import { updateOffer } from "redux/service/action";

export default function Offres(props) {
    const { offers, loading, ...rest } = props;
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedOfferEdit, setSelectedOfferEdit] = useState(null);
    const [selectedOfferDelete, setSelectedOfferDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    console.log("offres du projet:", offers);

    const handleOfferClick = (offer) => {
        setSelectedOffer(offer);
    };

    const handleOfferDeleteClick = (offer) => {
        setSelectedOfferDelete(offer);
    };

    const handleEditClick = (offer) => {
        setSelectedOfferEdit(offer);
        setIsModalOpen(true);
        console.log(offer)
    };

    const handleCloseModal = () => {
        setSelectedOffer(null);
    };

    const handleEditOffer = (offerID, newData) => {
          dispatch(updateOffer(offerID, JSON.stringify(newData)));
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
    return (
        <>
            {offers.map((offer, index) => (
                <Card bg={bg} {...rest} p='14px'>
                    <Flex direction={{ base: "column", md: "row" }} alignItems='center' justifyContent='center' key={index}>
                        <Box mt={{ base: "10px", md: "0" }} onClick={() => handleOfferClick(offer)} cursor="pointer">
                            <Text
                                color={textColorPrimary}
                                fontWeight='500'
                                fontSize='md'
                                mb='4px'>
                                {offer.name}
                            </Text>
                            <Text
                                fontWeight='500'
                                color={textColorSecondary}
                                fontSize='sm'
                                me='4px'>
                                {offer.description}
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
                                onClick={() => handleEditClick(offer)}
                            />
                            <Icon
                                as={MdDelete}
                                color='red.500'
                                h='24px' w='24px'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOfferDeleteClick(offer)}
                            />
                        </Flex>
                    </Flex>
                </Card>
            ))}
            {selectedOffer && (
                <OfferDetailModal offer={selectedOffer} onClose={handleCloseModal} />
            )}
            {selectedOfferEdit && (
                <OfferModal
                    isEdit
                    selectedOffer={selectedOfferEdit}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    handleEditOffer={handleEditOffer}
                    loading={loading} />
            )}
            {selectedOfferDelete && (
                <OfferDeleteModal
                    offer={selectedOfferDelete}
                    onClose={() => setSelectedOfferDelete(null)}
                    isOpen={!!selectedOfferDelete}
                    loading={loading}
                />
            )}
        </>
    );
}
