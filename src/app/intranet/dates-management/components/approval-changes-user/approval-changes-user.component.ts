import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-changes-user',
  templateUrl: './approval-changes-user.component.html',
  styleUrls: ['./approval-changes-user.component.scss']
})
export class ApprovalChangesUserComponent implements OnInit {

  @Input() userData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
