import { Component } from 'react'
import ContactItem from '../ContactItem/ContactItem'
import './ContactList.css'

export class ContactList extends Component {
  render() {
    const {
      contacs,
      onDelete,
      onAddContact,
      onEditContact,
    } = this.props

    return (
      <div className="contact-list">
        <div className="contacts">
          {contacs.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onEdit={onEditContact}
            />
          ))}
        </div>

        <button
          type="button"
          className="new-contact"
          onClick={onAddContact}
        >
          New
        </button>
      </div>
    )
  }
}

export default ContactList