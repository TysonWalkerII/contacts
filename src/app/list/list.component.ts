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
  errorMessage = 'something went wrong again';
  listFilterString: string = '';
  contacts: Contacts[] = [];
  filteredList: Contacts[] = [];
  sub!: Subscription;
  contactMakerState = true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2: string[] = ['FirstName', 'LastName', 'Number', 'Id'];
  ContactsArray: Contacts[] = [
    { id: 1, FirstName: 'Hydrogen', LastName: 'Hydrogen', Number: 'H' },
    { id: 2, FirstName: 'Helium', LastName: 'Hydrogen', Number: 'He' },
    { id: 3, FirstName: 'Lithium', LastName: 'Hydrogen', Number: 'Li' },
    { id: 4, FirstName: 'Beryllium', LastName: 'Hydrogen', Number: 'Be' },
    { id: 5, FirstName: 'Boron', LastName: 'Hydrogen', Number: 'B' },
    { id: 6, FirstName: 'Carbon', LastName: 'Hydrogen', Number: 'C' },
    { id: 7, FirstName: 'Nitrogen', LastName: 'Hydrogen', Number: 'N' },
    { id: 8, FirstName: 'Oxygen', LastName: 'Hydrogen', Number: 'O' },
    { id: 9, FirstName: 'Fluorine', LastName: 'Hydrogen', Number: 'F' },
    { id: 10, FirstName: 'Neon', LastName: 'Hydrogen', Number: 'Ne' },
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = this.ContactsArray;
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
    console.log(this.dataSource2);
    // this.contacts = this.contactsService.getNumbers();

    //this.sub = this.contactsService.getNumbers().subscribe({
    //  next: (contacts) => {
    //    this.contacts = contacts;
    //    this.filteredList = this.contacts;
    //  },
    //  error: (err) => (this.errorMessage = err),
    //});
    //this.fetchContacts();

    //this.filteredList = this.contactsService.getNumbers();
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
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
