import { Contact } from './Contact.js';

export class User {
  constructor(data) {
    this.contacts = data.contacts.map(el => new Contact(el));
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.lastName = data.lastName || '';
    this.name = data.name;
    this.surname = data.surname;
    this.updatedAt = data.updatedAt;
  }

  set() {
    this.contacts = data.contacts.map(el => new Contact(el));
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.lastName = data.lastName || '';
    this.name = data.name;
    this.surname = data.surname;
    this.updatedAt = new Date();
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      lastName: this.lastName,
      contacts: this.contacts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}




