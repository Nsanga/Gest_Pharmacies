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
import ServiceModal from "./PharmaciesModal";
import { updateService } from "redux/service/action";
import { useDispatch } from "react-redux";
import ServiceDeleteModal from "./PharmacieDeleteModal";

export default function Services(props) {
  const { services, loading, isOffer, offers, ...rest } = props;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceEdit, setSelectedServiceEdit] = useState(null);
  const [selectedServiceDelete, setSelectedServiceDelete] = useState(null);
  const [isModalServiceOpen, setIsModalServiceOpen] = useState(false);
  const dispatch = useDispatch();

  console.log("services du projet:", services);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleServiceDeleteClick = (service) => {
    setSelectedServiceDelete(service);
  };

  const handleEditClick = (service) => {
    setSelectedServiceEdit(service);
    setIsModalServiceOpen(true);
    console.log(service)
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleEditService = (serviceID, newData) => {
    dispatch(updateService(serviceID, JSON.stringify(newData)));
  }

  useEffect(() => {
    if (!loading) {
      setIsModalServiceOpen(false);
    }
  }, [loading]);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  return (
    <>
      {services.map((service, index) => (
        <Card bg={bg} {...rest} p='14px'>
        <Flex direction={{ base: "column", md: "row" }} alignItems='center' justifyContent='center' key={index}>
          <Box mt={{ base: "10px", md: "0" }} onClick={() => handleServiceClick(service)} cursor="pointer">
            <Text
              color={textColorPrimary}
              fontWeight='500'
              fontSize='md'
              mb='4px'>
              {service.name}
            </Text>
            <Text
              fontWeight='500'
              color={textColorSecondary}
              fontSize='sm'
              me='4px'>
              {service.description}
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
              onClick={() => handleEditClick(service)}
            />
            <Icon
              as={MdDelete}
              color='red.500'
              h='24px' w='24px'
              style={{ cursor: 'pointer' }}
              onClick={() => handleServiceDeleteClick(service)}
            />
          </Flex>
        </Flex>
        </Card>
      ))}
      {selectedService && (
        <ServiceDetailModal service={selectedService} onClose={handleCloseModal} />
      )}
      {selectedServiceEdit && (
        <ServiceModal 
        isEdit
        selectedService={selectedServiceEdit} 
        isOpen={isModalServiceOpen}
        onClose={() => setIsModalServiceOpen(false)}
        handleEditService={handleEditService}
        offers={offers}
        loading={loading} />
      )}
      {selectedServiceDelete && (
        <ServiceDeleteModal 
        service={selectedServiceDelete} 
        onClose={() => setSelectedServiceDelete(null)} 
        isOpen={!!selectedServiceDelete} 
        loading={loading} />
      )}
    </>
  );
}
