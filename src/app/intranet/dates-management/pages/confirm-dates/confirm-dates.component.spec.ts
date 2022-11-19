import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDatesComponent } from './confirm-dates.component';

describe('ConfirmDatesComponent', () => {
  let component: ConfirmDatesComponent;
  let fixture: ComponentFixture<ConfirmDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
