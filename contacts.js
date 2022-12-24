const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(
    "/GO IT/GitHub/NODE_JS/DZ_1/db",
    "contacts.json"
);

async function readDb() {
    const dbRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRaw);
    return db;
}

async function writeDb(db) {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function getContacts() {
    const db = await readDb();
    return db;
}

async function getContactById(id) {
    const db = await readDb();
    const contactById = db.find((contact) => contact.id === id);
    return contactById;
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const contact = { id, name, email, phone };
    const db = await readDb();
    db.push(contact);
    await writeDb(db);
}

async function removeContact(id, name, email, phone) {
    const db = await readDb();
    const updatedDb = db.filter((contact) => contact.id !== id);
    await writeDb(updatedDb);
}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
};
