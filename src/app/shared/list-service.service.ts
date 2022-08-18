import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Contacts } from './contacts';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  makeContact(contact: Contacts) {
    console.log(contact);
    this.http
      .post(
        'https://angular-project-e98dd-default-rtdb.firebaseio.com/contacts.json',
        contact
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getNumbers() {
    return contacts;
  }

  // getNumbers(): Observable<Contacts[]> {
  //   return this.http
  //     .get<Contacts[]>(
  //       'https://angular-project-e98dd-default-rtdb.firebaseio.com/contacts.json'
  //     )
  //     .pipe(
  //       tap((data) => console.log('All: ', JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

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

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
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
