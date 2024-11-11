

import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Customer } from '../customer.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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
    return this.http.post<Customer>(this.apiUrl, customer, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
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

  checkEmailExists(email: string): Observable<any> {
    const url = `${this.apiUrl}/find/${email}`;
    return this.http.get<Customer>(url, this.httpOptions)
  }
}