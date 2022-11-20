import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../../public/auth/services/modals.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-visitor-dates',
  templateUrl: './assign-visitor-dates.component.html',
  styleUrls: ['./assign-visitor-dates.component.scss']
})
export class AssignVisitorDatesComponent implements OnInit {

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
  ) { }

  ngOnInit(): void {
  }

}
