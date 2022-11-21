import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/shared/sevices/modals.service';
import { GenerateCredentialComponent } from './generate-credential/generate-credential.component';
import { RejectRequestComponent } from './reject-request/reject-request.component';

@Component({
  selector: 'app-approve-dates',
  templateUrl: './approve-dates.component.html',
  styleUrls: ['./approve-dates.component.scss']
})
export class ApproveDatesComponent implements OnInit {

  constructor(
    private modalService: ModalsService
  ) { }

  ngOnInit(): void {
  }

  openGenerateCredential() {
    this.modalService.openModal(GenerateCredentialComponent);
  }
  openRejectRequestComponent(){
    this.modalService.openModal(RejectRequestComponent);
  }
}
