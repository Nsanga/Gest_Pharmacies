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
import ServiceDetailModal from "./MedicamentDetailsModal";
import MedicamentModal from "./MedicamentsModal";
import { useDispatch } from "react-redux";
import MedicamentDeleteModal from "./MedicamentDeleteModal";
import { updateMedicament } from "redux/medicament/action";
import { FaFilePdf } from "react-icons/fa";

export default function Medicaments(props) {
  const { medicaments, loading, isList, ...rest } = props;
  const [selectedMedicament, setSelectedMedicament] = useState(null);
  const [selectedMedicamentEdit, setSelectedMedicamentEdit] = useState(null);
  const [selectedMedicamentDelete, setSelectedMedicamentDelete] = useState(null);
  const [isModalmedicamentOpen, setIsModalmedicamentOpen] = useState(false);
  const dispatch = useDispatch();

  console.log("medicaments du projet:", medicaments);

  const handleMedicamentClick = (medicament) => {
    setSelectedMedicament(medicament);
  };

  const handleMedicamentDeleteClick = (medicament) => {
    setSelectedMedicamentDelete(medicament);
  };

  const handleEditClick = (medicament) => {
    setSelectedMedicamentEdit(medicament);
    setIsModalmedicamentOpen(true);
    console.log(medicament)
  };

  const handleCloseModal = () => {
    setSelectedMedicament(null);
  };

  const handleEditMedicament = (medicamentID, newData) => {
    dispatch(updateMedicament(medicamentID, JSON.stringify(newData)));
  }

  const handleDownloadPDF = (pdfLink) => {
    // Vous pouvez effectuer ici toute logique nécessaire avant de télécharger le PDF, si nécessaire
    window.open(pdfLink, '_blank'); // Ouvre le lien dans une nouvelle fenêtre pour télécharger le PDF
  };

  useEffect(() => {
    if (!loading) {
      setIsModalmedicamentOpen(false);
    }
  }, [loading]);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  return (
    <>
      {medicaments?.map((medicament, index) => (
        <Card bg={bg} {...rest} p='14px'>
          <Flex direction={{ base: "column", md: "row" }} key={index}>
            <Box mt={{ base: "10px", md: "0" }} onClick={() => handleMedicamentClick(medicament)} cursor= "pointer" >
              <Text
                color={textColorPrimary}
                fontWeight='500'
                fontSize='md'
                mb='10px'>
                {medicament.name}
              </Text>
              <Flex gap={4} width='100%'>
                <Text
                  fontWeight='500'
                  color={textColorSecondary}
                  fontSize='md'>
                  Prix: {medicament.price}
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
                  onClick={() => handleEditClick(medicament)}
                />
                <Icon
                  as={MdDelete}
                  color='red.500'
                  h='24px' w='24px'
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleMedicamentDeleteClick(medicament)}
                />
              </Flex>

          </Flex>
        </Card>
      ))}
      {selectedMedicament && (
        <ServiceDetailModal medicament={selectedMedicament} onClose={handleCloseModal} />
      )}
      {selectedMedicamentEdit && (
        <MedicamentModal
          isEdit
          selectedMedicament={selectedMedicamentEdit}
          isOpen={isModalmedicamentOpen}
          onClose={() => setIsModalmedicamentOpen(false)}
          handleEditMedicament={handleEditMedicament}
          loading={loading} />
      )}
      {selectedMedicamentDelete && (
        <MedicamentDeleteModal
          medicament={selectedMedicamentDelete}
          onClose={() => setSelectedMedicamentDelete(null)}
          isOpen={!!selectedMedicamentDelete}
          loading={loading} />
      )}
    </>
  );
}
