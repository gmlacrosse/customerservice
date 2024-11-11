import { Component } from '@angular/core';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from './services/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
  imports: [
    CustomerListComponent,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [CustomerService, HttpClient],
})

export class AppComponent {
  title = 'customerservice';
}
