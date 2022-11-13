import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

contenido = 'Eduy';

  constructor(
    private modal: ModalsService
  ) { }

  ngOnInit(): void {
    this.openModal(this.contenido);
  }

  openModal(contenido:any) {
    this.modal.openModal(contenido);
  }

}
