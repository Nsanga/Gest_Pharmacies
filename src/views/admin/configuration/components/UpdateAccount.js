import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'

const UpdateAccount = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box>
            <FormControl>
                <FormLabel>Login</FormLabel>
                <Input placeholder="Votre nom d'utilisateur" />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Mot de passe actuel</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Entrer le mot de passe actuel'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? <IoEyeOff /> : <IoEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Entrer le nouveau mot de passe'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? <IoEyeOff /> : <IoEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirer le nouveau mot de passe'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? <IoEyeOff /> : <IoEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex justifyContent='flex-end' mt={10}>
                <Button colorScheme='blue'>
                    Modifier
                </Button>
            </Flex>
        </Box>
    )
}

export default UpdateAccount
