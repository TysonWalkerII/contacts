import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contacts } from '../shared/contacts';
import { ListService } from '../shared/list-service.service';

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

  constructor(private contactsService: ListService, private http: HttpClient) {}

  ngOnInit(): void {
    // this.contacts = this.contactsService.getNumbers();

    //this.sub = this.contactsService.getNumbers().subscribe({
    //  next: (contacts) => {
    //    this.contacts = contacts;
    //    this.filteredList = this.contacts;
    //  },
    //  error: (err) => (this.errorMessage = err),
    //});
    //this.fetchContacts();

    this.fetchContacts();

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
        console.log(res);
        this.contacts = res;
        this.filteredList = res;
      });
  }
}
