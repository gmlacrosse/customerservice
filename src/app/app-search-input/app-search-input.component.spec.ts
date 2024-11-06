import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchInputComponent } from './app-search-input.component';

describe('AppSearchInputComponent', () => {
  let component: AppSearchInputComponent;
  let fixture: ComponentFixture<AppSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
