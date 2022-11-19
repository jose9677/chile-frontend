import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDayDatesComponent } from './assign-day-dates.component';

describe('AssignDayDatesComponent', () => {
  let component: AssignDayDatesComponent;
  let fixture: ComponentFixture<AssignDayDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDayDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDayDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
