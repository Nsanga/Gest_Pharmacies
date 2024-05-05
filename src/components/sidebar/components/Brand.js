import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import LogoMakeda from "../../../assets/img/logoMakeda.png";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      {/* <Image src={LogoMakeda} alt='Logo Makeda' borderRadius='10px' />
      <HSeparator mb='20px' /> */}
    </Flex>
  );
}

export default SidebarBrand;
