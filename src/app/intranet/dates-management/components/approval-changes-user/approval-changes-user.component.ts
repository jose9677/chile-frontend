import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EvaluateChangesService } from '../../shared/services/evaluate-changes.service';

@Component({
  selector: 'app-approval-changes-user',
  templateUrl: './approval-changes-user.component.html',
  styleUrls: ['./approval-changes-user.component.scss']
})
export class ApprovalChangesUserComponent implements OnInit {

  @Input() originalData: any;
  @Input() modifiedData: any;

  public authorizedEdit: boolean;


  constructor(
    private evaluateChangesService: EvaluateChangesService
  ) {

    this.authorizedEdit = this.evaluateChangesService.roleAuthorizedEdit;

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  ngOnInit(): void {
    this.evaluateChangesService.refresh$;
  }

  edit(e: Event) {

    e.preventDefault();
    this.evaluateChangesService.changeEditingPersonalData(true);
  }

}
