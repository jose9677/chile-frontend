import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { DatesService } from '../../shared/services/dates.service';
import { VisitorDataComponent } from '../visitor-data/visitor-data.component';

@Component({
  selector: 'app-confirm-dates',
  templateUrl: './confirm-dates.component.html',
  styleUrls: ['./confirm-dates.component.scss']
})
export class ConfirmDatesComponent implements OnInit {

  private errors: boolean;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  public unassignedRequest: any[];
  private dataRequest: any;



  constructor(
  private modalService: ModalsService,
  private routerquery: ActivatedRoute,
  private router: Router,
  private datesService: DatesService,

  ) {

    this.unassignedRequest = [];

    this.idRequestSubscription = this.routerquery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

  }

  ngOnInit(): void {

    this.datesService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)

      if (result.length === 0 || this.errors === true) {
        result = this.dataRequest
        console.log(result);
      }else {
        result = result
      }

      result.map((res: any)=>{
        res.fullName = res.names_assistant +' '+ res.lastname_assistant;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail;
        res.fullDirection = res.street + ' ' + res.way_number +', '+ res.description +' '+ res.property_number;

        this.unassignedRequest.push(res);
      })
      console.log(this.unassignedRequest)

    })
  }

  reasignDate(idRequest: any) {

    this.datesService.reasignRequest(idRequest).subscribe((result) => {
      console.log(result)
    },
    error => {


    },
    () => {

      this.errors = false
      let title= "Reprogramar Cita";
      let message = "El visitador se pondra en contacto con usted a través de una llamada telefónica para acordar una nueva fecha y hora de la visita.";
      this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      this.router.navigate(['/solicitud/solicitudes-de-inscripcion']);


    });

  }

  confirmDate(idRequest: any){

    this.datesService.confirmRequest(idRequest).subscribe((result) => {
      console.log(result)
    },
    error => {


    },
    () => {

      this.errors = false
      let title= "Cita Confirmada";
      let message = "Su cita a sido confirmada con exito";
      this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      this.router.navigate(['/solicitud/solicitudes-de-inscripcion']);

    });
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

  return() {
    this.router.navigate(['/solicitud/solicitudes-de-inscripcion']);

  }

  visitador(){
    this.modalService.openModal(VisitorDataComponent)
  }
}
