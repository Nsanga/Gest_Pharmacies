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
import MedicamentModal from "./components/MedicamentsModal";
import Medicaments from "./components/Medicaments";
import { connect, useDispatch } from "react-redux";
import EmptyData from "components/emptyData";
import { listMedicaments } from "redux/medicament/action";
import { AddMedicament } from "redux/medicament/action";
import { listPharmacie } from "redux/pharmacie/action";

const Pharmacie = ({ medicaments, loading, pharmacies }) => {
    const [isMedicamentsOpen, setIsMedicamentsOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listMedicaments());
        dispatch(listPharmacie());
    }, [dispatch]);

    const handleAddService = (addData) => {
        console.log(addData)
        dispatch(AddMedicament(addData));
    };

    useEffect(() => {
        if (!loading) {
            setIsMedicamentsOpen(false)
        }
    }, [loading]);

    return (
        <Card mt="100px">
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Médicaments</Tab>
                    <Tab>Suivi des médicaments</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent={"flex-end"} marginBottom={6}>
                            <MedicamentModal
                                isEdit={false}
                                onOpen={() => setIsMedicamentsOpen(true)}
                                isOpen={isMedicamentsOpen}
                                onClose={() => setIsMedicamentsOpen(false)}
                                medicaments={medicaments}
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
                                        medicaments.length === 0 ? (
                                            <EmptyData />
                                        ) : (
                                            <Medicaments
                                                mb="20px"
                                                medicaments={medicaments}
                                                pharmacies={pharmacies}
                                                loading={loading}
                                                isList
                                            />
                                        )
                                    }

                                </>
                            )
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            loading ? (
                                <Flex alignItems='center' justifyContent='center'>
                                    <Spinner color='blue.500' size='xl' />
                                </Flex>
                            ) : (
                                <>
                                    {
                                        medicaments.length === 0 ? (
                                            <EmptyData />
                                        ) : (
                                            <Medicaments
                                                mb="20px"
                                                loading={loading}
                                                medicaments={medicaments}
                                                isList={false}
                                            />
                                        )
                                    }

                                </>
                            )
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Card>
    );
}

const mapStateToProps = ({ MedicamentReducer, PharmacieReducer }) => ({
    medicaments: MedicamentReducer.medicaments,
    loading: MedicamentReducer.loading,
    pharmacies: PharmacieReducer.pharmacies,
});

export default connect(mapStateToProps)(Pharmacie);