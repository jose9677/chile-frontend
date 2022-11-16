import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../public/auth/services/modals.service';
import { AssignRequestComponent } from './assign-request/assign-request.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(
    private modalService: ModalsService,
  ) { }

  ngOnInit(): void {
  }
  modalRecovery() {
    this.modalService.openModal(AssignRequestComponent);
  }

}
