import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../api/contact-service'

const initialState = {
  contacts: [],
  contactEdit: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await getContacts()
    return response.data
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact) => {
    const response = await createContact(contact)
    return response.data
  }
)

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact) => {
    const response = await updateContact(contact)
    return response.data
  }
)

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id) => {
    await deleteContact(id)
    return id
  }
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {
    selectContact: (state, action) => {
      state.contactEdit = action.payload
    },

    clearContact: (state) => {
      state.contactEdit = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }
    },
  },

  extraReducers: (builder) => {
    builder


      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload
      })


      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload)

        state.contactEdit = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }
      })


      .addCase(editContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? action.payload
            : contact
        )

        state.contactEdit = action.payload
      })


      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        )

        state.contactEdit = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }
      })
  },
})

export const {
  selectContact,
  clearContact,
} = contactsSlice.actions

export default contactsSlice.reducer