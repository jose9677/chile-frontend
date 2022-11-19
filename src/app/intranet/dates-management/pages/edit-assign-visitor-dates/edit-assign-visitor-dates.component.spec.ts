import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignVisitorDatesComponent } from './edit-assign-visitor-dates.component';

describe('EditAssignVisitorDatesComponent', () => {
  let component: EditAssignVisitorDatesComponent;
  let fixture: ComponentFixture<EditAssignVisitorDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssignVisitorDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignVisitorDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
