import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contacts } from '../shared/contacts';
import { ListService } from '../shared/list-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // listFilterString: string = '';
  contacts: Contacts[] = [];
  constructor(private contactsService: ListService) {}

  ngOnInit(): void {
    this.contacts = this.contactsService.getNumbers();
    this.filteredList = this.contactsService.getNumbers();
  }

  set listFilter(value: string) {
    this.filteredList = this.performFilter(value);
    console.log(value, this.performFilter(value));
  }
  filteredList: Contacts[] = [];

  performFilter(filterBy: string): Contacts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.contacts.filter((contact: Contacts) =>
      contact.FirstName.toLocaleLowerCase().includes(filterBy)
    );
  }
}
