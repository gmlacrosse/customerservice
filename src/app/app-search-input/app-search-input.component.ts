import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './app-search-input.component.html',
  styleUrls: ['./app-search-input.component.css'],
  imports: [FormsModule]
})
export class SearchInputComponent {
  @Output() searchTextChanged = new EventEmitter<string>();

  searchText = '';

  onSearch() {
    this.searchTextChanged.emit(this.searchText);
  }
}