import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalChangesUserComponent } from './approval-changes-user.component';

describe('ApprovalChangesUserComponent', () => {
  let component: ApprovalChangesUserComponent;
  let fixture: ComponentFixture<ApprovalChangesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalChangesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalChangesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
