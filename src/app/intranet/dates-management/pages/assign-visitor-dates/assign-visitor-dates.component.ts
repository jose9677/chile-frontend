import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalsService } from '../../../../public/auth/services/modals.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-visitor-dates',
  templateUrl: './assign-visitor-dates.component.html',
  styleUrls: ['./assign-visitor-dates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignVisitorDatesComponent implements OnInit {

  @Input () data: any;

  nroRequest: any;

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
  ) {

   }

  ngOnInit(): void {
    this.nroRequest= this.data
  }

}
