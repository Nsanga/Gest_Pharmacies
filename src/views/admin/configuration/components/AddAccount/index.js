import React from 'react'
import AddAccountModal from './AddAccountModal'
import { Flex } from '@chakra-ui/react'
import AccountList from './AccountList'

const AddAccount = () => {
    return (
        <>
            <Flex justifyContent='flex-end' >
                <AddAccountModal isEdit={false} />
            </Flex>
            <AccountList />

        </>
    )
}

export default AddAccount
