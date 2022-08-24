import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contacts } from '../shared/contacts';
import { ListService } from '../shared/list-service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  contacts: Contacts[] = [];
  filteredList: Contacts[] = [];
  contactMakerState = true;

  constructor(private contactsService: ListService, private http: HttpClient) {}
  contactMaker() {
    if (this.contactMakerState == true) {
      this.contactMakerState = false;
      console.log(this.contactMakerState);
    } else {
      this.contactMakerState = true;
      console.log(this.contactMakerState);
    }
  }

  ngOnInit(): void {
    this.fetchContacts();
  }

  set listFilter(value: string) {
    this.filteredList = this.performFilter(value);
    console.log(value, this.performFilter(value));
  }

  performFilter(filterBy: string): Contacts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.contacts.filter((contact: Contacts) =>
      contact.FirstName.toLocaleLowerCase().includes(filterBy)
    );
  }

  fetchContacts() {
    this.http
      .get<{ [key: string]: Contacts }>(
        'https://angular-project-e98dd-default-rtdb.firebaseio.com/contacts.json'
      )
      .pipe(
        map((res) => {
          const contacts = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              contacts.push({ ...res[key], id: key });
            }
          }
          return contacts;
        })
      )
      .subscribe((res) => {
        console.log('thing' + res);
        this.contacts = res;

        this.filteredList = res;
        console.log('filtered' + this.filteredList);
      });
  }
}
