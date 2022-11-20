import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-assign-visitor-dates',
  templateUrl: './assign-visitor-dates.component.html',
  styleUrls: ['./assign-visitor-dates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignVisitorDatesComponent implements OnInit {

  @Input () data: any;

  nroRequest: any;

  constructor() {

   }

  ngOnInit(): void {
    this.nroRequest= this.data
  }

}
