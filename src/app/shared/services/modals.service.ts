import { Injectable, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    private modal: NgbModal,

    )
  {
    this.modal.hasOpenModals

  }

  openModal(content: any) {
    const modalRef= this.modal.open(content,{centered: true, backdrop:'static', backdropClass:'background-modal', keyboard: false} );
  }

  openModalData(content: any, data:any) {
    const modalRef= this.modal.open(content,{centered: true, backdrop:'static', backdropClass:'background-modal', keyboard: false} );
    modalRef.componentInstance.data = data;

  }

  openModalData2(content: any, data:any, data2:any) {
    const modalRef= this.modal.open(content,{centered: true, backdrop:'static', backdropClass:'background-modal', keyboard: false} );
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.data2 = data2;

  }

  openModalAlert(content: any) {
    const modalRef= this.modal.open(content,{centered: true} );
  }



  OpenModalError(content: any, error: any) {
    const modalRef= this.modal.open(content );
    modalRef.componentInstance.error = error;
  }
  OpenModalError2(content: any, error: any, title: any, message:any) {
    const modalRef= this.modal.open(content );
    modalRef.componentInstance.error = error;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }
  // se coloca @Input() error: any; en el modulo



}
