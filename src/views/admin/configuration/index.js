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
import { connect, useDispatch } from "react-redux";
import UpdateAccount from "./components/UpdateAccount";
import AddAccount from "./components/AddAccount";

const Pharmacie = ({ medicaments, loading, pharmacies }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, []);


    return (
        <Card mt="100px">
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Modifier votre compte</Tab>
                    <Tab>Ajouter un compte</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UpdateAccount />
                    </TabPanel>
                    <TabPanel>
                        <AddAccount />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Card>
    );
}

const mapStateToProps = ({ MedicamentReducer, PharmacieReducer }) => ({
    
});

export default connect(mapStateToProps)(Pharmacie);