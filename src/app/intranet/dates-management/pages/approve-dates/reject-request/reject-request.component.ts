import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'src/app/shared/sevices/modals.service';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.scss']
})
export class RejectRequestComponent implements OnInit {

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
  ) { }

  ngOnInit(): void {
  }

}
