// AccountList.js
import React, { useState } from 'react';
import AddAccountModal from './AddAccountModal';
import { Button, Box, Flex, Icon } from "@chakra-ui/react";
import Card from 'components/card/Card';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/user/action';
import DeleteAccountModal from './DeleteAccountModal';

const AccountList = ({ users, loading }) => {
    const [selectedUserEdit, setSelectedUserEdit] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserDelete, setSelectedUserDelete] = useState(null);
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);

    const dispatch = useDispatch();

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleUserDeleteClick = (user) => {
        setSelectedUserDelete(user);
    };

    const handleEditClick = (user) => {
        setSelectedUserEdit(user);
        setIsModalUserOpen(true);
        console.log(user)
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleEditUser = (userID, newData) => {
        dispatch(updateUser(userID, JSON.stringify(newData)));
    }

    return (
        <>
            {users.map((user, index) => (
                <Card p='14px' mt={4}>
                    <Flex jus key={index} justifyContent='space-between' alignItems='center'>
                        <Box>{user.username}</Box>
                        <Flex gap={4}>
                            <Icon
                                as={MdEdit}
                                color='blue.500'
                                h='24px' w='24px'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleEditClick(user)}
                            />
                            <Icon
                                as={MdDelete}
                                color='red.500'
                                h='24px' w='24px'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleUserDeleteClick(user)}
                            />
                        </Flex>
                    </Flex>
                </Card>
            ))}

            <AddAccountModal
                selectedUser={selectedUserEdit}
                isOpen={isModalUserOpen}
                onClose={() => setIsModalUserOpen(false)}
                handleEditUser={handleEditUser}
                loading={loading} isEdit={true} />

            <DeleteAccountModal
                user={selectedUserDelete}
                onClose={() => setSelectedUserDelete(null)}
                isOpen={!!selectedUserDelete}
                loading={loading} />
        </>
    );
};

export default AccountList;
