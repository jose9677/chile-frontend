import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDatesComponent } from './approve-dates.component';

describe('ApproveDatesComponent', () => {
  let component: ApproveDatesComponent;
  let fixture: ComponentFixture<ApproveDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
