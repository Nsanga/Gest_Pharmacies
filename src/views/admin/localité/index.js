import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Automatic from "./components/Automatic";
import LocaliteModal from "./components/LocaliteModal";
import localite from "./localite";
import { connect, useDispatch } from "react-redux";
import { listCampaigns } from "redux/campagne/action";
import EmptyData from "components/emptyData";
import { AddIcon } from "@chakra-ui/icons";
import { AddCampaign } from "redux/campagne/action";
import { updateCampaign } from "redux/campagne/action";
import LocaliteDeleteModal from "./components/LocaliteDeleteModal";
import { listGroups } from "redux/campagne/action";

function Localité({ campaigns, loading, groups }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedCampaignDelete, setSelectedCampaignDelete] = useState(null);
  const [selectedCampaignRetrive, setSelectedCampaignRetrive] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalManualAddOpen, setIsModalManualAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalRetriveOpen, setIsModalRetriveOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const type = selectedTab === 0 ? "Instantly" : "Automatically";
    dispatch(listCampaigns({ type: type }));
    dispatch(listGroups())
  }, [dispatch, selectedTab]);
  console.log('groups::', groups)

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleEditClick = (item) => {
    console.log('item', item)
    setSelectedCampaign(item);
    setIsModalOpen(true);
  }

  const handleDeleteClick = (item) => {
    setSelectedCampaignDelete(item);
    setIsModalDeleteOpen(true);
  }

  const handleRetriveClick = (item) => {
    setSelectedCampaignRetrive(item);
    setIsModalRetriveOpen(true);
  }

  const handleAddCampaign = (newData) => {
    const type = selectedTab === 0 ? "Instantly" : "Automatically";
    const dataWithType = { ...newData, type };
    dispatch(AddCampaign(dataWithType))
  }

  const handleEditCampaign = (campaignID, newData) => {
    const type = selectedTab === 0 ? "Instantly" : "Automatically";
    const dataWithType = { ...newData, type };
    dispatch(updateCampaign(campaignID, JSON.stringify(dataWithType)))
  }

  useEffect(() => {
    if (!loading) {
      setIsModalOpen(false);
      setIsModalAddOpen(false);
      setIsModalManualAddOpen(false)
      setIsModalDeleteOpen(false)
      setIsModalRetriveOpen(false);
    }
  }, [loading]);

  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <>
      <Card mt="100px">
        <Tabs variant="enclosed" onChange={handleTabChange}>
          <TabList>
            <Tab>Régions</Tab>
            <Tab>Arrondissements</Tab>
            <Tab>Villes</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex justifyContent={"flex-end"} marginBottom={6}>
                <Button
                  onClick={() => setIsModalManualAddOpen(true)}
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  style={{ fontSize: "12px" }}
                >
                  AJOUTER
                </Button>
              </Flex>
              {
                loading ? (
                  <Flex alignItems='center' justifyContent='center'>
                    <Spinner color='blue.500' size='xl' />
                  </Flex>
                ) : (
                  <>
                    {
                      campaigns.length === 0 ? (
                        <EmptyData />
                      ) : (
                        <>
                          {campaigns.map((item, index) => (
                            <Automatic
                            key={index}
                            boxShadow={cardShadow}
                            mb="20px"
                            ranking="1"
                            title={item.name}
                            description={item.description}
                            handleEditClick={() => handleEditClick(item)}
                            handleDeleteClick={() => handleDeleteClick(item)}
                            loading={loading}
                            groups={groups}
                          />
                          ))}
                        </>
                      )
                    }

                  </>
                )
              }

            </TabPanel>
            <TabPanel>
              <Flex justifyContent={"flex-end"} marginBottom={6}>
                <Button
                  onClick={() => setIsModalAddOpen(true)}
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  style={{ fontSize: "12px" }}
                >
                  AJOUTER
                </Button>
              </Flex>
              {
                loading ? (
                  <Flex alignItems='center' justifyContent='center'>
                    <Spinner color='blue.500' size='xl' />
                  </Flex>
                ) : (
                  <>
                    {
                      campaigns.length === 0 ? (
                        <EmptyData />
                      ) : (
                        <>
                          {campaigns.map((item, index) => (
                            <Automatic
                              key={index}
                              boxShadow={cardShadow}
                              mb="20px"
                              ranking="1"
                              title={item.name}
                              description={item.description}
                              handleEditClick={() => handleEditClick(item)}
                              handleDeleteClick={() => handleDeleteClick(item)}
                              loading={loading}
                              groups={groups}
                            />
                          ))}
                        </>
                      )
                    }

                  </>
                )
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
      {selectedCampaign && (
        <LocaliteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaign={selectedCampaign}
          title='Modifier une campagne automatique'
          isManual={false}
          label="Modifier"
          handleEditCampaign={handleEditCampaign}
          type="Automatically"
          loading={loading}
          groups={groups}
        />
      )}

      {isModalAddOpen && (
        <LocaliteModal
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
          title='Ajouter une campagne automatique'
          isManual={false}
          label="Ajouter"
          handleAddCampaign={handleAddCampaign}
          type="Automatically"
          loading={loading}
          groups={groups}
        />
      )}

      {isModalManualAddOpen && (
        <LocaliteModal
          isOpen={isModalManualAddOpen}
          onClose={() => setIsModalManualAddOpen(false)}
          title='Ajouter une campagne manuelle'
          isManual
          label="Ajouter"
          loading={loading}
          handleAddCampaign={handleAddCampaign}
          groups={groups}
        />
      )}

      {selectedCampaignDelete && (
        <LocaliteDeleteModal
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
          campaign={selectedCampaignDelete}
          loading={loading}
          type={selectedTab === 0 ? "Instantly" : "Automatically"} />
      )}
    </>
  );
}

const mapStateToProps = ({ CampaignReducer }) => ({
  campaigns: CampaignReducer.campaigns,
  loading: CampaignReducer.loading,
  groups: CampaignReducer.groups,
});

export default connect(mapStateToProps)(Localité);
