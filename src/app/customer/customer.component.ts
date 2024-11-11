import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Customer } from '../customer.model';

@Component({
  selector: 'customer-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  @Input() customer!: Customer;
}
