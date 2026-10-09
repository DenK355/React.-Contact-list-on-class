import ContactItem from '../ContactItem/ContactItem'
import './ContactList.css'

function ContactList({
  contacts,
  onDelete,
  onAddContact,
  onEditContact,
}) {
  return (
    <div className="contact-list">

      <div className="contacts">

        {contacts.map((contact) => (
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

export default ContactList