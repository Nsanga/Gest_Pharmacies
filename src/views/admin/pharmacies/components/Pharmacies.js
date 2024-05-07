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
import ServiceDetailModal from "./PharmacieDetailsModal";
import PharmacieModal from "./PharmaciesModal";
import { useDispatch } from "react-redux";
import PharmacieDeleteModal from "./PharmacieDeleteModal";
import { updatePharmacie } from "redux/pharmacie/action";
import { FaFilePdf } from "react-icons/fa";

export default function Pharmacies(props) {
  const { pharmacies, loading, isList, ...rest } = props;
  const [selectedPharmacie, setSelectedPharmacie] = useState(null);
  const [selectedPharmacieEdit, setSelectedPharmacieEdit] = useState(null);
  const [selectedPharmacieDelete, setSelectedPharmacieDelete] = useState(null);
  const [isModalPharmacieOpen, setIsModalPharmacieOpen] = useState(false);
  const dispatch = useDispatch();

  console.log("pharmacies du projet:", pharmacies);

  const handlePharmacieClick = (pharmacie) => {
    setSelectedPharmacie(pharmacie);
  };

  const handlePharmacieDeleteClick = (pharmacie) => {
    setSelectedPharmacieDelete(pharmacie);
  };

  const handleEditClick = (pharmacie) => {
    setSelectedPharmacieEdit(pharmacie);
    setIsModalPharmacieOpen(true);
    console.log(pharmacie)
  };

  const handleCloseModal = () => {
    setSelectedPharmacie(null);
  };

  const handleEditPharmacie = (pharmacieID, newData) => {
    dispatch(updatePharmacie(pharmacieID, JSON.stringify(newData)));
  }

  const handleDownloadPDF = (pdfLink) => {
    // Vous pouvez effectuer ici toute logique nécessaire avant de télécharger le PDF, si nécessaire
    window.open(pdfLink, '_blank'); // Ouvre le lien dans une nouvelle fenêtre pour télécharger le PDF
  };

  useEffect(() => {
    if (!loading) {
      setIsModalPharmacieOpen(false);
    }
  }, [loading]);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  return (
    <>
      {pharmacies?.map((pharmacie, index) => (
        <Card bg={bg} {...rest} p='14px'>
          <Flex direction={{ base: "column", md: "row" }} alignItems='center' justifyContent='center' key={index}>
            <Box mt={{ base: "10px", md: "0" }} onClick={() => handlePharmacieClick(pharmacie)} cursor="pointer" >
              <Text
                color={textColorPrimary}
                fontWeight='500'
                fontSize='md'
                mb='10px'>
                {pharmacie.name}
              </Text>
              <Flex gap={4} width='100%'>
                <Text
                  fontWeight='500'
                  color={textColorSecondary}
                  fontSize='md'>
                  {pharmacie.adress}
                </Text>
                <Text
                  fontWeight='500'
                  color={textColorSecondary}
                  fontSize='md'>
                  |
                </Text>
                <Text
                  fontWeight='500'
                  color={textColorSecondary}
                  fontSize='md'>
                  {pharmacie.phone}
                </Text>
              </Flex>
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
                onClick={() => handleEditClick(pharmacie)}
              />
              <Icon
                as={MdDelete}
                color='red.500'
                h='24px' w='24px'
                style={{ cursor: 'pointer' }}
                onClick={() => handlePharmacieDeleteClick(pharmacie)}
              />
            </Flex>
          </Flex>
        </Card>
      ))}
      {selectedPharmacie && (
        <ServiceDetailModal pharmacie={selectedPharmacie} onClose={handleCloseModal} />
      )}
      {selectedPharmacieEdit && (
        <PharmacieModal
          isEdit
          selectedPharmacie={selectedPharmacieEdit}
          isOpen={isModalPharmacieOpen}
          onClose={() => setIsModalPharmacieOpen(false)}
          handleEditPharmacie={handleEditPharmacie}
          loading={loading} />
      )}
      {selectedPharmacieDelete && (
        <PharmacieDeleteModal
          pharmacie={selectedPharmacieDelete}
          onClose={() => setSelectedPharmacieDelete(null)}
          isOpen={!!selectedPharmacieDelete}
          loading={loading} />
      )}
    </>
  );
}
