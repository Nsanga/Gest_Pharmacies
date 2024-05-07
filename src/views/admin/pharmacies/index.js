import React, { useEffect, useState } from "react";
import {
    useColorModeValue,
    Flex,
    Spinner,
    Button,
    useDisclosure,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PharmaciesModal from "./components/PharmaciesModal";
import Pharmacies from "./components/Pharmacies";
import { connect, useDispatch } from "react-redux";
import EmptyData from "components/emptyData";
import { AddIcon } from "@chakra-ui/icons";
import { AddPharmacie } from "redux/pharmacie/action";
import { listPharmacie } from "redux/pharmacie/action";

const Pharmacie = ({ pharmacies, loading }) => {
    const [isPharmaciesModalOpen, setIsPharmaciesModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listPharmacie());
    }, [dispatch]);

    const handleAddService = (addData) => {
        console.log(addData)
        dispatch(AddPharmacie(addData));
    };

    useEffect(() => {
        if (!loading) {
            setIsPharmaciesModalOpen(false)
        }
    }, [loading]);

    return (
        <Card mt="100px">
            <Flex justifyContent={"flex-end"} marginBottom={6}>
                <PharmaciesModal
                    isEdit={false}
                    onOpen={() => setIsPharmaciesModalOpen(true)}
                    isOpen={isPharmaciesModalOpen}
                    onClose={() => setIsPharmaciesModalOpen(false)}
                    pharmacies={pharmacies}
                    loading={loading}
                    handleAddService={handleAddService} />
            </Flex>
            {
                loading ? (
                    <Flex alignItems='center' justifyContent='center'>
                        <Spinner color='blue.500' size='xl' />
                    </Flex>
                ) : (
                    <>
                        {
                            pharmacies.length === 0 ? (
                                <EmptyData />
                            ) : (
                                <Pharmacies
                                    mb="20px"
                                    pharmacies={pharmacies}
                                    loading={loading}
                                    isList
                                />
                            )
                        }

                    </>
                )
            }

        </Card>
    );
}

const mapStateToProps = ({ PharmacieReducer }) => ({
    pharmacies: PharmacieReducer.pharmacies,
    loading: PharmacieReducer.loading,
});

export default connect(mapStateToProps)(Pharmacie);