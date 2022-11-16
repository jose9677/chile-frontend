import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRequestFormComponent } from './assign-request-form.component';

describe('AssignRequestFormComponent', () => {
  let component: AssignRequestFormComponent;
  let fixture: ComponentFixture<AssignRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
