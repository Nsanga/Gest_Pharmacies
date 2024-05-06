import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdLocalHospital,
} from "react-icons/md";
import { FaHandHoldingMedical, FaUsers } from "react-icons/fa";
import { BiSolidLocationPlus } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";

// Admin Imports
import MainDashboard from "views/admin/default";
import Configuration from "views/admin/configuration";
import Pharmacies from "views/admin/pharmacies";
import Médicaments from "views/admin/medicaments";
import Localités from "views/admin/localité";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Pharmacies",
    layout: "/admin",
    path: "/pharmacies",
    icon: (
      <Icon as={MdLocalHospital} width='20px' height='20px' color='inherit'/>
    ),
    component: Pharmacies,
    secondary: true,
  },
  {
    name: "Médicaments",
    layout: "/admin",
    icon: <Icon as={FaHandHoldingMedical} width='20px' height='20px' color='inherit' />,
    path: "/medicaments",
    component: Médicaments,
  },
  {
    name: "Localités",
    layout: "/admin",
    path: "/localités",
    icon: <Icon as={BiSolidLocationPlus} width='20px' height='20px' color='inherit' />,
    component: Localités,
  },
  {
    name: "Configuration",
    layout: "/admin",
    path: "/configuration",
    icon: <Icon as={LuSettings2} width='20px' height='20px' color='inherit' />,
    component: Configuration,
  },
];

export default routes;
