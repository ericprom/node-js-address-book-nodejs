
const { fakeDatabase } = require('../database/fakeDatabase');
const findAll = (query) => {
  const contacts = fakeDatabase.selectAllFromContacts()
  if (query === undefined){
    return contacts
  }
  else{
    if (query.phrase){
      return contacts.filter(contact => contact.name.toLowerCase().includes(query.phrase.toLowerCase()))
    }
    if (query.limit){
      return contacts.slice(0,query.limit)
    }
  }
};

const findById = (contactId) => {
  const contacts = fakeDatabase.selectFromContactsById(contactId)
  return contacts
};
const deleteById = (contactId) => {
  const contact = fakeDatabase.selectFromContactsById(contactId)
  if(contact !== undefined) {
    fakeDatabase.deleteContactsById(contactId)
    return true
  }
  else{
    return false
  }
};

module.exports = {
	findAll,
  findById,
  deleteById
};