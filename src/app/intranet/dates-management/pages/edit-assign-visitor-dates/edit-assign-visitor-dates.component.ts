import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-edit-assign-visitor-dates',
  templateUrl: './edit-assign-visitor-dates.component.html',
  styleUrls: ['./edit-assign-visitor-dates.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EditAssignVisitorDatesComponent implements OnInit {


  @Input () dates: any;



  constructor() { }

  ngOnInit(): void {


  }

}
