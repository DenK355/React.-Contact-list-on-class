import { Component } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'


export class App extends Component {

    state = {

      contacts: [],
      contactEdit: this.createEmptyContact(),

    }

    createEmptyContact(){
      
      return{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
      }

    }

    componentDidMount(){
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      
      if(!contacts){
        this.setState({
          contacts: [],
        })
      }else {
        this.setState({
          contacts: [...contacts]
        })
      }
    }

    componentDidUpdate(){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    saveToLocalStorage(contacts){
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    deleteContact = (id) => {
      const contacts = [...this.state.contacts.filter((contact) => contact.id !== id)];
      this.setState({
        contacts:contacts,
      });
      this.saveToLocalStorage(contacts);
    }

    saveContact = (contact) => {
      if(!contact.id){
        this.createContact(contact);
      } else {
        this.updateContact(contact);
      }
    }

    addNewContact = () => {
      this.setState({
        contactEdit: this.createEmptyContact(),
      })
    }

    selectContact = (contact) => {
      this.setState({
        contactEdit: contact,
      })
    }

    createContact = (contact) => {

      contact.id = nanoid();
      const contacts = [...this.state.contacts, contact];
      this.saveToLocalStorage(contacts);
      this.setState({
        contacts: contacts,
        contactEdit: this.createEmptyContact(),
      });

    }

    updateContact = (contact) => {
      this.setState((state) => {
        const contacts = state.contacts.map((item) => {
          return item.id === contact.id ? contact : item
        })
    
        return {
          contacts,
          contactEdit: contact,
        }
      })
    }







render(){
  return (
    <div className='container'>

      <h1 className='header'>Contact List</h1>

      <div className='main'>
        <ContactList
          contacs = {this.state.contacts}
          onDelete = {this.deleteContact}
          onAddContact = {this.addNewContact}
          onEditContact = {this.selectContact}
        />
        <ContactForm 
          key = {this.state.contactEdit.id}
          contactEdit = {this.state.contactEdit}
          onSubmit = {this.saveContact}
          onDelete = {this.deleteContact}
        />
      </div>
    </div>
  )
}
  
}

export default App
