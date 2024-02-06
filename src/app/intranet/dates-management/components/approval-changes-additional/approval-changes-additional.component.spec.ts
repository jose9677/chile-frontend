import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalChangesAdditionalComponent } from './approval-changes-additional.component';

describe('ApprovalChangesAdditionalComponent', () => {
  let component: ApprovalChangesAdditionalComponent;
  let fixture: ComponentFixture<ApprovalChangesAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalChangesAdditionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalChangesAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
