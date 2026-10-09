import './ContactItem.css'

function ContactItem({
  contact,
  onDelete,
  onEdit,
}) {

  const onItemDelete = (e) => {
    e.stopPropagation()
    onDelete(contact.id)
  }

  const onContactEdit = (e) => {
    e.stopPropagation()
    onEdit(contact)
  }

  return (
    <div className="contact-item">

      <p
        className="content"
        onDoubleClick={onContactEdit}
      >
        {contact.firstName} {contact.lastName}
      </p>

      <span
        className="delete-btn"
        onClick={onItemDelete}
      >
        X
      </span>

    </div>
  )
}

export default ContactItem