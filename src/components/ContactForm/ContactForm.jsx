import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { useState } from 'react';
import { Form, Label, Name, Telephone, Button } from './ContactForm.styled';

function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'tel':
        setTel(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!name.trim() || !tel.trim()) {
      alert('Warning! Please enter correct data! ');
      return;
    }
    if (contacts.find(contact => contact.name === name)) {
      alert(
        'Warning! A contact with this name already exists in the contact book! '
      );
      return;
    }
    onSubmit(name, tel);
    setName('');
    setTel('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Name
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Label>
      <Label>
        Tel:
        <Telephone
          type="tel"
          name="tel"
          value={tel}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

const mapStateToProps = ({ phonebook: { contacts } }) => ({
  contacts,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, tel) => dispatch(actions.addContact(name, tel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
