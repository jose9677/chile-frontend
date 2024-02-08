import { Component, OnInit } from '@angular/core';
import { EvaluateChangesService } from '../../shared/services/evaluate-changes.service';

@Component({
  selector: 'app-approval-changes-request',
  templateUrl: './approval-changes-request.component.html',
  styleUrls: ['./approval-changes-request.component.scss']
})
export class ApprovalChangesRequestComponent implements OnInit {

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
    this.evaluateChangesService.changeEditingRequestData(true);
  }

}
