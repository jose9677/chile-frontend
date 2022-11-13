import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private modal: NgbModal) { }

  openModal(content: any) {
    this.modal.open(content);
  }
}
