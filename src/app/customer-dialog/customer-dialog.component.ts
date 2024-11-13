import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Customer } from '../customer.model';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  providers: [CustomerService],
})
export class CustomerDialogComponent implements OnInit {
  customerForm: FormGroup;
  errorMessage: string | undefined;
  isEditMode: boolean = false;
  customer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    created: new Date(),
    updated: new Date()
  }

  constructor(
    private fb: FormBuilder, public customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    if (data) {
      this.customer = { ...data };
    }
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      id: [this.customer.id],
      firstName: [this.customer.firstName, Validators.required],
      lastName: [this.customer.lastName, Validators.required],
      email: [this.customer.email, [Validators.required, Validators.email]],
      created: [this.customer.created],
      updated: [this.customer.updated]
    });
  }

  onSubmit() {
    if (this.customerForm?.valid) {
      const theCustomer: Customer = this.customerForm.value;

      if (theCustomer.id === null) {
        theCustomer.id = 0;
        theCustomer.created = new Date();
        theCustomer.updated = new Date();
        this.customerService.createCustomer(theCustomer).subscribe(
          () => {
            console.log('added');
            this.dialogRef.close(this.customerForm.value);
          },
          error => {
            this.errorMessage = error;
            console.log(error);
          }
        );
      } else {
        this.customerService.updateCustomer(theCustomer).subscribe(
          () => {
            console.log('updated');
            this.dialogRef.close(this.customerForm.value);
          },
          error => {
            this.errorMessage = error;
            console.log(error);
          }
        );
      }
    }
  }
}
