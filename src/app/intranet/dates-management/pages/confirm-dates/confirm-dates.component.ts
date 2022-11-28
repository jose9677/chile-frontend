import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';

@Component({
  selector: 'app-confirm-dates',
  templateUrl: './confirm-dates.component.html',
  styleUrls: ['./confirm-dates.component.scss']
})
export class ConfirmDatesComponent implements OnInit {

  private errors: boolean;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  constructor(
  private modalService: ModalsService,
  private routerquery: ActivatedRoute,
  private router: Router,


  ) {

    this.idRequestSubscription = this.routerquery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

  }

  ngOnInit(): void {
  }
   modalReprogramarCita(){
    this.errors = false
    let title= "Reprogramar Cita";
    let message = "El visitador se pondra en contacto con usted a través de una llamada telefónica para acordar una nueva fecha y hora de la visita.";
    this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
  }
  modalConfimarCita(){
    this.errors = false
    let title= "Cita Confirmada";
    let message = "Su cita a sido confirmada con exito";
    this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

  return() {
    this.router.navigate(['/solicitud/solicitudes-de-inscripcion'])

  }
}
