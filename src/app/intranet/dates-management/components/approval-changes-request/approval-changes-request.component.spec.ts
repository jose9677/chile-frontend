import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalChangesRequestComponent } from './approval-changes-request.component';

describe('ApprovalChangesRequestComponent', () => {
  let component: ApprovalChangesRequestComponent;
  let fixture: ComponentFixture<ApprovalChangesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalChangesRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalChangesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
