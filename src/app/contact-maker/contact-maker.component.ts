import { Component, OnInit } from '@angular/core';
import { Contacts } from '../shared/contacts';
import { ListService } from '../shared/list-service.service';
import { FormControl } from '@angular/forms';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-contact-maker',
  templateUrl: './contact-maker.component.html',
  styleUrls: ['./contact-maker.component.css'],
})
export class ContactMakerComponent implements OnInit {
  constructor(
    private contactsService: ListService,
    private thing: ListComponent
  ) {}
  myControl = new FormControl();
  emailFormControl = new FormControl('', []);

  ngOnInit(): void {}

  newContact: Contacts = {
    id: 1,
    FirstName: '',
    LastName: '',
    Number: '',
  };

  addContact(contact: Contacts) {
    this.contactsService.addContact(contact);
    console.log('idk', this.contactsService.getNumbers);
    this.newContact = {
      id: 1,
      FirstName: '',
      LastName: '',
      Number: '',
    };
    this.thing.fetchContacts();
    this.thing.performFilter(this.thing.listFilter);
  }

  makeContact(contact: Contacts) {
    this.contactsService.makeContact(contact);
    this.thing.fetchContacts();
  }
}
