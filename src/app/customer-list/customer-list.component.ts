import { Component, OnInit, signal } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../services/customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { SearchInputComponent } from '../app-search-input/app-search-input.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  imports: [ReactiveFormsModule, NgFor, CommonModule, AddCustomerComponent, EditCustomerComponent, SearchInputComponent]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  lastSelectedCustomerId: number | null = null;
  selectedCustomer: Customer | undefined;
  showAddCustomer: Boolean | null = null;
  searchText = signal('');
  constructor(private customerService: CustomerService) { }

  OnUpdate($event: Customer) {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = customers;

      // Restore the last selected customer from session storage
      const lastSelectedId = sessionStorage.getItem('lastSelectedCustomerId');
      if (lastSelectedId) {
        this.lastSelectedCustomerId = +lastSelectedId;
      }
    });
  }

  OnAdd($event: Customer) {
    this.customers.push($event);
    this.filteredCustomers = this.customers;
  }


  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = customers;

      // Restore the last selected customer from session storage
      const lastSelectedId = sessionStorage.getItem('lastSelectedCustomerId');
      if (lastSelectedId) {
        this.lastSelectedCustomerId = +lastSelectedId;
      }
    });
  }


  selectCustomer(customer: Customer): void {
    this.showAddCustomer = null;
    this.selectedCustomer = customer;
    this.lastSelectedCustomerId = customer.id;
    sessionStorage.setItem('lastSelectedCustomerId', customer.id.toString());
  }

  deleteCustomer(customer: Customer): void {
    this.customerService.deleteCustomer(customer.id).subscribe(() => {
      // Handle success, e.g., display a success message

      // Refresh the customer list after deleting a customer
      this.customerService.getCustomers().subscribe(customers => {
        this.customers = customers;
      });
      this.filteredCustomers = this.customers;
    },
      error => {
        console.log(error);
        // Handle error, e.g., display an error message
      })
    window.location.reload();
  }

  onSearch(searchText: string) {
    this.filteredCustomers = this.customers.filter(
      cust => {
        let allText = `${cust.firstName} ${cust.lastName} ${cust.email}`.toLowerCase()

        if (allText.includes(searchText.toLowerCase())) {
          return cust;
        }

        return null;
      });
  }

  ToggleShowAddCustomer(): void {
    this.showAddCustomer = true;
    this.selectedCustomer = null;
  }
}