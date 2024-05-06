import React from "react";
import { Flex, Image, Box } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import pharmacieUSSD from "../../../assets/img/pharmacieUSSD.png";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <Image src={pharmacieUSSD} alt='Logo Makeda' borderRadius='10px' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
