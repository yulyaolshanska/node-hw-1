const path = require("path");
const fs = require("fs").promises;
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactList);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const contactById = contactList.find((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactList = await listContacts();
    const idx = contactList.findIndex((contact) => contact.id === contactId);
    if (!idx) {
      return null;
    }
    contactList.filter((contact) => contact.id !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactList = await listContacts();
    const newContact = { name, email, phone, id: v4() };
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
