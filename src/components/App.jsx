import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList ';
import { Container } from './App.styled';
import { save, load } from 'utils/local-storage-api';

const LOCAL_STORAGE_KEY = 'contacts';

export function App() {
  const [contacts, setContatcts] = useState(() => {
    return load(LOCAL_STORAGE_KEY) ?? [];
  });
  const [filter, setFilters] = useState('');

  useEffect(() => {
    save(LOCAL_STORAGE_KEY, contacts);
  }, [contacts]);

  const formSubmitHandle = data => {
    const isInContacts = contacts.find(({ name }) => name === data.name);

    if (isInContacts) {
      return alert(`${data.name} is aready in contacts.`);
    }

    setContatcts(contacts => [...contacts, data]);
  };

  const handleChange = e => {
    setFilters(e.currentTarget.value.trim());
  };

  const filteredContacts = () => {
    const regExp = new RegExp(filter, 'gi');
    return contacts.filter(({ name }) => name.match(regExp));
  };

  const deleteContact = contactId => {
    setContatcts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <h2>Phonebook</h2>
      <Form onSubmit={formSubmitHandle}></Form>

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange}></Filter>
      <ContactList
        filteredContacts={filteredContacts()}
        onDeleteContact={deleteContact}
      ></ContactList>
    </Container>
  );
}
