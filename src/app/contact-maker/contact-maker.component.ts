import { Component, OnInit } from '@angular/core';
import { Contacts } from '../shared/contacts';
import { ListService } from '../shared/list-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-maker',
  templateUrl: './contact-maker.component.html',
  styleUrls: ['./contact-maker.component.css'],
})
export class ContactMakerComponent implements OnInit {
  constructor(private contactsService: ListService) {}
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
  }
}
