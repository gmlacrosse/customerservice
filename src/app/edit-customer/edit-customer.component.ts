import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../customer.model';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditCustomerComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Output() recordUpdated = new EventEmitter<Customer>();

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    if (this.customer) {
      this.customerForm = this.fb.group({
        id: [this.customer.id],
        firstName: [this.customer.firstName, Validators.required],
        lastName: [this.customer.lastName, Validators.required],
        email: [this.customer.email, [Validators.required, Validators.email]]
      });
    }
  }

  ngOnChanges() {
    this.customerForm?.reset();

    if (this.customer) {
      this.customerForm = this.fb.group({
        id: [this.customer.id],
        firstName: [this.customer.firstName, Validators.required],
        lastName: [this.customer.lastName, Validators.required],
        email: [this.customer.email, [Validators.required, Validators.email]]
        // todo: add customer validator to check if email exists
      });
    }
  }
  
  onSubmit() {
    if (this.customerForm?.valid) {
      const customer: Customer = this.customerForm.value;
      customer.updated = new Date();
      this.customerService.updateCustomer(customer).subscribe(
        (cust) => {
          // Handle success, e.g., display a success message
          this.recordUpdated.emit(cust);
        },
        error => {
          console.log(error);
          // Handle error, e.g., display an error message
        }
      );
    }
  }
}