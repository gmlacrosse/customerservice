import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  imports: [ ReactiveFormsModule]
})
export class AddCustomerComponent implements OnInit {
  @Output() recordAdded = new EventEmitter<Customer>();
  customerForm?: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
      // todo: add customer validator to check if email exists
    });
  }

  onSubmit() {
    if (this.customerForm?.valid) {
      const customer: Customer = this.customerForm.value;
      customer.created = new Date();
      customer.updated = new Date();
      this.customerService.createCustomer(customer).subscribe(
        (cust) => {
          // Handle success, e.g., display a success message
          this.customerForm?.reset();
          this.recordAdded.emit(cust);          
        },
        error => {
          // Handle error, e.g., display an error message
        }
      );
    }
  }
}