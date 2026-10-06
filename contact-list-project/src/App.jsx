import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'

import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from './api/contact-service'

function App() {
  const createEmptyContact = () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [contacts, setContacts] = useState([])
  const [contactEdit, setContactEdit] = useState(createEmptyContact())

  
  useEffect(() => {
    getContacts()
      .then((response) => {
        setContacts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  
  const saveContact = (contact) => {
    if (!contact.id) {
      const newContact = {
        ...contact,
        id: nanoid(),
      }

      createContact(newContact)
        .then((response) => {
          setContacts((prevContacts) => [
            ...prevContacts,
            response.data,
          ])

          setContactEdit(createEmptyContact())
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      
      updateContact(contact)
        .then((response) => {
          setContacts((prevContacts) =>
            prevContacts.map((item) =>
              item.id === contact.id ? response.data : item
            )
          )

          setContactEdit(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  
  const removeContact = (id) => {
    deleteContact(id)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        )

        setContactEdit(createEmptyContact())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addNewContact = () => {
    setContactEdit(createEmptyContact())
  }

  const selectContact = (contact) => {
    setContactEdit(contact)
  }

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>

      <div className="main">

        <ContactList
          contacts={contacts}
          onDelete={removeContact}
          onAddContact={addNewContact}
          onEditContact={selectContact}
        />

        <ContactForm
          key={contactEdit.id}
          contactEdit={contactEdit}
          onSubmit={saveContact}
          onDelete={removeContact}
        />

      </div>
    </div>
  )
}

export default App