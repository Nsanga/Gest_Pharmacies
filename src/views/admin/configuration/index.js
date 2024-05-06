// import React, { useEffect, useState } from "react";
// import {
//   Tabs,
//   TabList,
//   Tab,
//   TabPanels,
//   TabPanel,
//   Spinner,
//   Flex,
// } from "@chakra-ui/react";
// import { connect, useDispatch } from "react-redux";
// import WhatsAppBot from "./components/WhatsAppBot";
// import Card from "components/card/Card";
// import Periodicity from "./components/Periodicity";
// import { listGroups } from "redux/campagne/action";
// import Group from "./components/Group";
// import GroupModal from "./components/Group/GroupModal";
// import EmptyData from "components/emptyData";
// import { AddGroup } from "redux/campagne/action";
// import { listUser } from "redux/user/action";

// const Configuration = ({ groups, loading, users }) => {
//   const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(listGroups())
//     dispatch(listUser())
//   }, [])
// console.log(groups)
//   const handleAddGroup = (addData) => {
//     dispatch(AddGroup(addData));
//   };

//   useEffect(() => {
//     if (!loading) {
//       setIsGroupModalOpen(false)
//     }
//   }, [loading]);

//   return (
//     <Card mt="100px">
//       <Tabs variant="enclosed">
//         <TabList>
//           <Tab>Bot WhatsApp</Tab>
//           <Tab>Groupe</Tab>
//         </TabList>

//         <TabPanels>
//           <TabPanel>
//             <WhatsAppBot />
//           </TabPanel>
//           <TabPanel>
//             <Flex justifyContent={"flex-end"} marginBottom={6}>
//               <GroupModal
//                 onOpen={() => setIsGroupModalOpen(true)}
//                 isOpen={isGroupModalOpen}
//                 onClose={() => setIsGroupModalOpen(false)}
//                 groups={groups}
//                 loading={loading}
//                 handleAddGroup={handleAddGroup} 
//                 users={users} />
//             </Flex>
//             {
//               loading ? (
//                 <Flex alignItems='center' justifyContent='center'>
//                   <Spinner color='blue.500' size='xl' />
//                 </Flex>
//               ) : (
//                 <>
//                   {
//                     groups.length === 0 ? (
//                       <EmptyData />
//                     ) : (

//                       <Group groups={groups} loading={loading} users={users}/>
//                     )
//                   }

//                 </>
//               )
//             }
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//     </Card>
//   );
// }

// const mapStateToProps = ({ CampaignReducer, UserReducer }) => ({
//   groups: CampaignReducer.groups,
//   loading: CampaignReducer.loading,
//   users: UserReducer.users,
// });

// export default connect(mapStateToProps)(Configuration);