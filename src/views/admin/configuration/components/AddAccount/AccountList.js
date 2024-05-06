// AccountList.js
import React from 'react';
import AddAccountModal from './AddAccountModal';
import { Button, Box } from "@chakra-ui/react";

const AccountList = ({ accounts }) => {
  const handleEdit = (account) => {
    // Logique pour ouvrir la modal en mode édition avec les infos du compte
  };

  const handleDelete = (accountId) => {
    // Logique de suppression du compte
  };

  return (
    <>
      {/* Affichage de la liste des comptes */}
      {/* {accounts.map((account) => (
        <Box key={account.id}>
          <span>{account.login}</span>
          <Button onClick={() => handleEdit(account)}>Modifier</Button>
          <Button onClick={() => handleDelete(account.id)}>Supprimer</Button>
        </Box>
      ))} */}

      {/* Modal pour ajouter ou éditer un compte */}
      {/* <AddAccountModal isOpen={false} onClose={() => {}} accountInfo={{}} isEdit={true} /> */}
    </>
  );
};

export default AccountList;
