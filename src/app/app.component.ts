import { Component } from '@angular/core';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
  imports: [
    CustomerListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    HttpClientModule,
    FormsModule
  ],
  providers: [CustomerService]
})

export class AppComponent {
  title = 'customerservice';
}
