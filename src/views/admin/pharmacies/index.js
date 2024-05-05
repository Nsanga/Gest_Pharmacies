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
import Services from "./components/Services";
import { connect, useDispatch } from "react-redux";
import EmptyData from "components/emptyData";
import { listServices } from "redux/service/action";
import { AddIcon } from "@chakra-ui/icons";
import { listOffers } from "redux/service/action";
import { AddService } from "redux/service/action";
import Offres from "./components/Offres";
import OfferModal from "./components/OfferModal";
import { AddOffer } from "redux/service/action";

const Pharmacies = ({ services, loading, offers }) => {
    const [isPharmaciesModalOpen, setIsPharmaciesModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    console.log("?????", offers)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listServices());
        dispatch(listOffers());
    }, [dispatch]);

    const handleAddService = (addData) => {
        dispatch(AddService(addData));
    };

    const handleAddOffer = (addData) => {
        dispatch(AddOffer(addData));
    };

    useEffect(() => {
        if (!loading) {
            setIsPharmaciesModalOpen(false)
            setIsOfferModalOpen(false)
        }
    }, [loading]);

    return (
        <Card mt="100px">
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Pharmacies</Tab>
                    <Tab>Suivi des pharmacies</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent={"flex-end"} marginBottom={6}>
                            <PharmaciesModal
                                isEdit={false}
                                onOpen={() => setIsPharmaciesModalOpen(true)}
                                isOpen={isPharmaciesModalOpen}
                                onClose={() => setIsPharmaciesModalOpen(false)}
                                services={services}
                                offers={offers}
                                loading={loading}
                                handleAddService={handleAddService} />
                        </Flex>
                        {/* {
                            loading ? (
                                <Flex alignItems='center' justifyContent='center'>
                                    <Spinner color='blue.500' size='xl' />
                                </Flex>
                            ) : (
                                <>
                                    {
                                        services.length === 0 ? (
                                            <EmptyData />
                                        ) : (
                                            <Services
                                                boxShadow={cardShadow}
                                                mb="20px"
                                                services={services}
                                                offers={offers}
                                                loading={loading}
                                            />
                                        )
                                    }

                                </>
                            )
                        } */}
                    </TabPanel>
                    <TabPanel>
                        {/* {
                            loading ? (
                                <Flex alignItems='center' justifyContent='center'>
                                    <Spinner color='blue.500' size='xl' />
                                </Flex>
                            ) : (
                                <>
                                    {
                                        offers.length === 0 ? (
                                            <EmptyData />
                                        ) : (
                                            <Offres
                                                boxShadow={cardShadow}
                                                mb="20px"
                                                offers={offers}
                                                loading={loading}
                                            />
                                        )
                                    }

                                </>
                            )
                        } */}
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Card>
    );
}

const mapStateToProps = ({ ServiceReducer }) => ({
    services: ServiceReducer.services,
    loading: ServiceReducer.loading,
    offers: ServiceReducer.offers,
});

export default connect(mapStateToProps)(Pharmacies);