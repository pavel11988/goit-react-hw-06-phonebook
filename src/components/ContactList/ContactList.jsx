import PropTypes from 'prop-types';
import actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

import { List } from './ContactList.styled';
import { Contact } from 'components/Contact/Contact';

function ContactList() {
  const { contacts, filter } = useSelector(state => state.phonebook);
  const dispatch = useDispatch();

  const getFilteredContacts = (allContacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <List>
      {filteredContacts.length !== 0 &&
        filteredContacts.map(({ id, name, tel }) => (
          <Contact
            key={id}
            id={id}
            name={name}
            tel={tel}
            onDeleteContact={() => dispatch(actions.deleteContact(id))}
          />
        ))}
    </List>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteContact: PropTypes.func,
};

export default ContactList;
