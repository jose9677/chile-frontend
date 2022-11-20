import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../../../public/auth/services/modals.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-generate-credential',
  templateUrl: './generate-credential.component.html',
  styleUrls: ['./generate-credential.component.scss']
})
export class GenerateCredentialComponent implements OnInit {

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
  ) { }

  ngOnInit(): void {
  }

}
