// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const contactsOperations = require("./contacts.js");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contactsOperations.listContacts();
      console.table(contactList);
      break;
    case "get":
      const contactById = await contactsOperations.getContactById(id);
      console.log(contactById);
      if (!contactById) {
        throw new Error(`Contact with id:${id} not found`);
      }
      break;
    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      if (!removeContact) {
        throw new Error(`Contact with id:${id} not found`);
      }
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

//        yargs
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
