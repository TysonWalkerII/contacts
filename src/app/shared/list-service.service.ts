import { findLast } from '@angular/compiler/src/directive_resolver';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Contacts } from './contacts';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor() {}

  getNumbers() {
    return contacts;
  }

  addContact(newContact: Contacts) {
    newContact.id == contacts.length + 1;
    contacts.push(newContact);
  }

  GetNumberBySearch(name) {
    contacts.forEach((element) => {
      if (element.FirstName === name) {
        return element;
      }
    });
  }
}

const contacts: Contacts[] = [
  { id: 1, FirstName: 'Doom', LastName: 'Guy', Number: '666-666-6666' },
  { id: 2, FirstName: 'Mug', LastName: 'Man', Number: '777-777-7777' },
  { id: 3, FirstName: 'Tails', LastName: 'Prower', Number: '888-888-8888' },
  {
    id: 4,
    FirstName: 'Asriel',
    LastName: 'Something',
    Number: '999-999-9999',
  },
];
