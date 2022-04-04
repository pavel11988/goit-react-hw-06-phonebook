import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('phonebook/addContact', (name, tel) => ({
  payload: {
    id: shortid.generate(),
    name,
    tel,
  },
}));

const deleteContact = createAction('phonebook/deleteContact');
const changeFilter = createAction('phonebook/changeFilter');

const actions = {
  addContact,
  deleteContact,
  changeFilter,
};

export default actions;
