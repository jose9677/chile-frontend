import { Component, OnInit } from '@angular/core';
import { EvaluateChangesService } from '../../shared/services/evaluate-changes.service';

@Component({
  selector: 'app-approval-changes-additional',
  templateUrl: './approval-changes-additional.component.html',
  styleUrls: ['./approval-changes-additional.component.scss']
})
export class ApprovalChangesAdditionalComponent implements OnInit {

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
    this.evaluateChangesService.changeEditingAdditionalInformation(true);
  }

}
