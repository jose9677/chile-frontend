import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDatesComponent } from './status-dates.component';

describe('StatusDatesComponent', () => {
  let component: StatusDatesComponent;
  let fixture: ComponentFixture<StatusDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
