import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatesComponent } from './create-dates.component';

describe('CreateDatesComponent', () => {
  let component: CreateDatesComponent;
  let fixture: ComponentFixture<CreateDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
