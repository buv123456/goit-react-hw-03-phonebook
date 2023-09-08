import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactFofm } from './ContactFofm/ContactFofm';
import { Layout, WrapperStyled, Header } from './App.styled';
import Phonebook from './Phonebook/Phonebook';
import { load, save } from 'helpers/storage';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: load('contacts') });
  }

  componentDidUpdate(pProps, { contacts }) {
    if (contacts !== this.state.contacts) {
      save('contacts', this.state.contacts);
    }
  }

  addContact = ({ name, number }) => {
    name = name.trim();
    number = number.trim();
    const isInList = this.state.contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    isInList
      ? alert(name + ' is already in contacts list!')
      : this.setState(prev => ({
          contacts: [...prev.contacts, { name, number, id: nanoid() }],
        }));
  };

  changeFilter = filterStr => this.setState({ filter: filterStr });

  deleteContact = idForDel => {
    const undeletedContacts = this.state.contacts.filter(
      ({ id }) => id !== idForDel
    );
    this.setState({ contacts: [...undeletedContacts] });
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(({ name, number }) =>
      (name + number).toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <Layout>
        <WrapperStyled>
          <Header>Phonebook</Header>
          <ContactFofm addContact={this.addContact} />
        </WrapperStyled>
        {!!contacts.length && (
          <Phonebook
            filter={filter}
            onChangeFilter={this.changeFilter}
            filteredContacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        )}
        <Toaster position="top-right" reverseOrder={false} gutter={8} />
      </Layout>
    );
  }
}
