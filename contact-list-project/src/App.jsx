import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import './App.css'

import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'

import {
  fetchContacts,
  addContact,
  editContact,
  removeContact,
  selectContact,
  clearContact,
} from './redux/contactsSlice'

function App() {

  const dispatch = useDispatch()

  const contacts = useSelector(
    (state) => state.contacts.contacts
  )

  const contactEdit = useSelector(
    (state) => state.contacts.contactEdit
  )

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const saveContact = (contact) => {

    if (!contact.id) {

      const newContact = {
        ...contact,
        id: nanoid(),
      }

      dispatch(addContact(newContact))

    } else {

      dispatch(editContact(contact))

    }
  }

  const deleteContact = (id) => {
    dispatch(removeContact(id))
  }

  const addNewContact = () => {
    dispatch(clearContact())
  }

  const selectContactHandler = (contact) => {
    dispatch(selectContact(contact))
  }

  return (
    <div className="container">

      <h1 className="header">
        Contact List
      </h1>

      <div className="main">

        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onEditContact={selectContactHandler}
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