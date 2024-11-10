import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  template: `<div class="container">
  <div class="input">
      <input type="text" [(ngModel)]="searchText" (ngModelChange)="emitSearchTextChanged()">
  </div>
</div>`,
  styleUrls: ['./app-search-input.component.css'],
  imports: [FormsModule]
})
export class SearchInputComponent {
  @Input() searchText!: Signal<string>;
  @Output() searchTextChanged = new EventEmitter<string>();


  emitSearchTextChanged() {
    this.searchTextChanged.emit(this.searchText());
  }
}