import { Component, OnInit } from '@angular/core';
import { EvaluateChangesService } from '../../shared/services/evaluate-changes.service';

@Component({
  selector: 'app-approval-changes-documents',
  templateUrl: './approval-changes-documents.component.html',
  styleUrls: ['./approval-changes-documents.component.scss']
})
export class ApprovalChangesDocumentsComponent implements OnInit {

  public authorizedEdit: boolean;

  constructor(
    private evaluateChangesService: EvaluateChangesService
  ) {

    this.authorizedEdit = this.evaluateChangesService.roleAuthorizedEdit;

  }

  ngOnInit(): void {
  }

  edit(e: Event) {

    e.preventDefault();
    this.evaluateChangesService.changeEditingDocuments(true);
  }

}
