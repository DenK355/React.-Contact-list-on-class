import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'

function App() {
  const createEmptyContact = () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [contacts, setContacts] = useState([])
  const [contactEdit, setContactEdit] = useState(createEmptyContact())

  // Загружаем контакты при запуске приложения
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'))

    if (savedContacts) {
      setContacts(savedContacts)
    }
  }, [])

  // Сохраняем контакты после каждого изменения
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    )

    setContactEdit(createEmptyContact())
  }

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact)
    } else {
      updateContact(contact)
    }
  }

  const addNewContact = () => {
    setContactEdit(createEmptyContact())
  }

  const selectContact = (contact) => {
    setContactEdit(contact)
  }

  const createContact = (contact) => {
    const newContact = {
      ...contact,
      id: nanoid(),
    }

    setContacts((prevContacts) => [
      ...prevContacts,
      newContact,
    ])

    setContactEdit(createEmptyContact())
  }

  const updateContact = (contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((item) =>
        item.id === contact.id ? contact : item
      )
    )

    setContactEdit(contact)
  }

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>

      <div className="main">
        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onEditContact={selectContact}
        />

        <ContactForm
          key={contactEdit.id}
          contactEdit={contactEdit}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  )
}

export default App