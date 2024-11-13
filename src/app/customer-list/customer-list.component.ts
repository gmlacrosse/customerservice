import { Component, OnInit, signal } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../services/customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { SearchInputComponent } from '../app-search-input/app-search-input.component';
import { CustomerComponent } from "../customer/customer.component";
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  imports: [ReactiveFormsModule, NgFor, CommonModule, SearchInputComponent, CustomerComponent, HttpClientModule]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  lastSelectedCustomerId: number | null = null;
  selectedCustomer: Customer | undefined;
  searchText = signal('');

  constructor(private customerService: CustomerService, private dialog: MatDialog) { }

  openAddDialog() {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: {}      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Refresh();
      }
    });
  }

  openEditDialog(customer: Customer) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: { ...customer}, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Refresh();
      }
    });
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = customers;

      const lastSelectedId = sessionStorage.getItem('lastSelectedCustomerId');
      if (lastSelectedId) {
        this.lastSelectedCustomerId = +lastSelectedId;
      }
    });
  }


  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.lastSelectedCustomerId = customer.id;
    sessionStorage.setItem('lastSelectedCustomerId', customer.id.toString());
  }

  deleteCustomer(customer: Customer): void {
    this.customerService.deleteCustomer(customer.id).subscribe(() => {
      this.customerService.getCustomers().subscribe(customers => {
        this.customers = customers;
      });
      this.filteredCustomers = this.customers;
    },
      error => {
        console.log(error);
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

  private Refresh(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = customers;

      const lastSelectedId = sessionStorage.getItem('lastSelectedCustomerId');
      if (lastSelectedId) {
        this.lastSelectedCustomerId = +lastSelectedId;
      }
    });
  }
}