import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../../public/auth/services/modals.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-assign-request',
  templateUrl: './assign-request.component.html',
  styleUrls: ['./assign-request.component.scss']
})
export class AssignRequestComponent implements OnInit {

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
  ) { }

  ngOnInit(): void {
  }

}
