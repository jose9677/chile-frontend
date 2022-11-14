import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {



  @Input() error:any; title: any; message: any;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {


  }

  // openModal(contenido:any) {
  //   this.modal.openModal(contenido);
  // }

}
