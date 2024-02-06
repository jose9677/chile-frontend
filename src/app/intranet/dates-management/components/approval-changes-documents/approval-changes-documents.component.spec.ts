import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalChangesDocumentsComponent } from './approval-changes-documents.component';

describe('ApprovalChangesDocumentsComponent', () => {
  let component: ApprovalChangesDocumentsComponent;
  let fixture: ComponentFixture<ApprovalChangesDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalChangesDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalChangesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
