import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import Card from "components/card/Card.js";

const Localite = () => {
    return (
        <Card mt="100px">
            <Flex alignItems='center' justifyContent='center'>
                <Spinner color='blue.500' size='xl' />
            </Flex>
        </Card>
    )
}

export default Localite
