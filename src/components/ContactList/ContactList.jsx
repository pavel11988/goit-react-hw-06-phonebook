import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { List } from './ContactList.styled';
import { Contact } from 'components/Contact/Contact';

const ContactList = ({ contacts, onDeleteContact }) => (
  <List>
    {contacts &&
      contacts.map(({ id, name, tel }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          tel={tel}
          onDeleteContact={onDeleteContact}
        />
      ))}
  </List>
);

const getFilteredContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const mapStateToProps = ({ phonebook: { contacts, filter } }) => ({
  contacts: getFilteredContacts(contacts, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(actions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
