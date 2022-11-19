import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVisitorDatesComponent } from './assign-visitor-dates.component';

describe('AssignVisitorDatesComponent', () => {
  let component: AssignVisitorDatesComponent;
  let fixture: ComponentFixture<AssignVisitorDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignVisitorDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVisitorDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
