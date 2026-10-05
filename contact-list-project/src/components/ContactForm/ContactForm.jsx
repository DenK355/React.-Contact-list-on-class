import { useState } from 'react'
import './ContactForm.css'

function ContactForm({ contactEdit, onSubmit, onDelete }) {

  const createEmptyContact = () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [form, setForm] = useState({
    ...contactEdit,
  })

  const onInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onClearField = (e) => {
    const sibling = e.target.parentNode.firstChild

    setForm({
      ...form,
      [sibling.name]: '',
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      ...form,
    })

    if (!form.id) {
      setForm(createEmptyContact())
    }
  }

  const onContactDelete = () => {
    onDelete(form.id)
    setForm(createEmptyContact())
  }

  return (
    <form id="contact-form" onSubmit={onFormSubmit}>

      <div className="form-container">

        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="First Name"
            name="firstName"
            value={form.firstName}
            onChange={onInputChange}
          />

          <span
            className="clear"
            onClick={onClearField}
          >
            X
          </span>
        </div>

        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={onInputChange}
          />

          <span
            className="clear"
            onClick={onClearField}
          >
            X
          </span>
        </div>

        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={onInputChange}
          />

          <span
            className="clear"
            onClick={onClearField}
          >
            X
          </span>
        </div>

        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={onInputChange}
          />

          <span
            className="clear"
            onClick={onClearField}
          >
            X
          </span>
        </div>

      </div>

      <div className="btns">

        <button
          id="save"
          type="submit"
        >
          Save
        </button>

        {form.id && (
          <button
            id="delete"
            type="button"
            onClick={onContactDelete}
          >
            Delete
          </button>
        )}

      </div>

    </form>
  )
}

export default ContactForm