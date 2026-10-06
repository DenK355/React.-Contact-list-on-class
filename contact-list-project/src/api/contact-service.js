import axios from 'axios'

const API_URL = 'http://localhost:5000/contacts'

export const getContacts = () => {
  return axios.get(API_URL)
}

export const createContact = (contact) => {
  return axios.post(API_URL, contact)
}

export const updateContact = (contact) => {
  return axios.put(`${API_URL}/${contact.id}`, contact)
}

export const deleteContact = (id) => {
  return axios.delete(`${API_URL}/${id}`)
}