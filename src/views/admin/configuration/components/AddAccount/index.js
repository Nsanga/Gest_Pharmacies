import React, { useEffect, useState } from 'react'
import AddAccountModal from './AddAccountModal'
import { Flex, Spinner } from '@chakra-ui/react'
import AccountList from './AccountList'
import { connect, useDispatch } from 'react-redux'
import { list } from 'redux/users/action'
import EmptyData from 'components/emptyData'
import { Add } from 'redux/users/action'

const AddAccount = ({ users, loading }) => {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(list());
    }, [dispatch]);
    
    const handleAddUser = (addData) => {
        console.log(addData)
        dispatch(Add(addData));
    };

    useEffect(() => {
        if (!loading) {
            setIsUsersOpen(false)
        }
    }, [loading]);

    return (
        <>
            <Flex justifyContent='flex-end' >
                <AddAccountModal
                    isEdit={false}
                    onOpen={() => setIsUsersOpen(true)}
                    isOpen={isUsersOpen}
                    onClose={() => setIsUsersOpen(false)}
                    loading={loading}
                    handleAddUser={handleAddUser}
                />
            </Flex>
            {
                loading ? (
                    <Flex alignItems='center' justifyContent='center'>
                        <Spinner color='blue.500' size='xl' />
                    </Flex>
                ) : (
                    <>
                        {
                            users.length === 0 ? (
                                <EmptyData />
                            ) : (
                                <AccountList users={users} loading={loading} />
                            )
                        }

                    </>
                )
            }

        </>
    )
}

const mapStateToProps = ({ UserReducer }) => ({
    users: UserReducer.users,
    loading: UserReducer.loading,
});

export default connect(mapStateToProps)(AddAccount);
