

import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Customer } from './customer.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  /** Temporary mock service to simulate API Calls */

  // private customers: Customer[] = [{
  //   id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 2, firstName: 'Jane', lastName: 'Smith', email: 'janesmith@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 3, firstName: 'Micheal', lastName: 'Johnson', email: 'michaeljohnson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 4, firstName: 'Emily', lastName: 'Davis', email: 'emilydavis@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 5, firstName: 'Noah', lastName: 'Jackson', email: 'noahjackson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 6, firstName: 'Susan', lastName: 'Clark', email: 'susanclark@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 7, firstName: 'Sofia', lastName: 'Robins', email: 'sofiarobins@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 8, firstName: 'Homer', lastName: 'Simpson', email: 'homersimpson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 9, firstName: 'Marge', lastName: 'Simpson', email: 'homersimpson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 10, firstName: 'George', lastName: 'Burns', email: 'georgeburns@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 11, firstName: 'Betty', lastName: 'White', email: 'bettywhite@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 12, firstName: 'Ella', lastName: 'Martin', email: 'ellamartin@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 13, firstName: 'Ethan', lastName: 'Black', email: 'ethanblack@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 14, firstName: 'Jason', lastName: 'Stone', email: 'jasonstone@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 15, firstName: 'Mason', lastName: 'Wilson', email: 'masonwilson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 16, firstName: 'Jon', lastName: 'Cooper', email: 'joncooper@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 17, firstName: 'Lilly', lastName: 'Taylor', email: 'lillytaylor@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 18, firstName: 'Sharon', lastName: 'Glore', email: 'sharonglore@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 19, firstName: 'Janet', lastName: 'Thompson', email: 'janetthompson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // {
  //   id: 20, firstName: 'Billy', lastName: 'Anderson', email: 'billyanderson@example.com',
  //   created: new Date(), updated: undefined
  // },
  // ];
  // constructor() { }

  // getCustomers(): Observable<Customer[]> {
  //   return of(this.customers);
  // }

  // getCustomerById(id: number): Observable<Customer> {
  //   return of(this.customers.find(x => x.id === id));
  // }

  // createCustomer(customer: Customer): Observable<Customer[]> {
  //   const lastId = this.customers[this.customers.length -1]?.id;
  //   customer.id = lastId + 1;
  //   this.customers.push(customer);
  //   return of(this.customers);
  // }

  // updateCustomer(customer: Customer): Observable<Customer[]> {
  //   customer.updated = new Date();
  //   const index = this.customers.findIndex(c => c.id === customer.id);
  //   if (index !== -1) {
  //     this.customers[index] = customer;
  //   }
  //   return of(this.customers);
  // }

  // deleteCustomer(customer: Customer): Observable<Customer[]> {
  //   this.customers = this.customers.filter(c => c.id !== customer.id);
  //   return of(this.customers);
  // }

  // Actual Service Calls Here
  private apiUrl = 'https://localhost:3000/api/Customers'; // Replace with your actual API endpoint
  private httpOptions = {
    headers: new HttpHeaders({ 'accept': '*/*', 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<any> {
    const url = `${this.apiUrl}/${customer.id}`;
    let updatedCustomer = Object.assign({}, customer, { updated: new Date() }) as Customer;
    return this.http.put<Customer>(url, updatedCustomer, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCustomer(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return of(error.message || error);
  }
}