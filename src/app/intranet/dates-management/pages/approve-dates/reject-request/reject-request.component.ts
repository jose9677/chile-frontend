import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { DatesService } from '../../../shared/services/dates.service';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RejectRequestComponent implements OnInit {

  @Input() data: any; data2: any;



  constructor(
    public modalService: NgbActiveModal,
    private modalsService:ModalsService,
    private datesService: DatesService,
    private router: Router
  ) {


  }

  ngOnInit(): void {

  }

  confirmDeny (e: Event) {

    e.preventDefault();

    let idRequest = this.data2;
    let dataRequest = this.data;

    this.datesService.approbe(idRequest, dataRequest).subscribe((result) => {

      console.log(result);

    },

    error => {

      let errors = true;
      let title= "Solicitud Rechazada";
      let message = "La Solicitud fue fue Rechazada";
      this.modalsService.OpenModalError2(ModalComponent, errors, title, message);

      this.router.navigate(['/solicitud/asignar-cita']);

      this.modalService.close();


    },
    () => {




    })

  }


}
