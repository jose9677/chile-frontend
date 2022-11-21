import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'src/app/shared/sevices/modals.service';


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
