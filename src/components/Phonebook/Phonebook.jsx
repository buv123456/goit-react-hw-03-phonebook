import React from 'react';
import { BtnDelAllStyled, PhonebookStyled } from './Phonebook.styled';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

function Phonebook({
  filter,
  filteredContacts,
  onDelete,
  onChangeFilter,
  deleteAll,
}) {
  return (
    <PhonebookStyled>
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <ContactList
        filteredContacts={filteredContacts}
        onDelete={onDelete}
        deleteAll={deleteAll}
      />
      <BtnDelAllStyled type="button" onClick={() => deleteAll()}>
        delete all
      </BtnDelAllStyled>
    </PhonebookStyled>
  );
}

export default Phonebook;
