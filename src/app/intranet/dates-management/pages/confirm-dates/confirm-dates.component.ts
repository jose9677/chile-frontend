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

  public documentsPre: any[];

  public documentsDom: any[];



  constructor(
  private modalService: ModalsService,
  private routerquery: ActivatedRoute,
  private router: Router,
  private datesService: DatesService,

  ) {

    this.documentsDom = [];

    this.documentsPre = [];

    this.unassignedRequest = [];


  }

  ngOnInit(): void {

    this.idRequestSubscription = this.routerquery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.datesService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)

      if (result.length === 0 || this.errors === true) {
        result = this.dataRequest
      }else {
        result = result
      }

      result.map((res: any)=>{
        res.fullName = res.names_assistant +' '+ res.lastname_assistant;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail;
        res.fullDirection = res.street + ' ' + res.way_number +', '+ res.description +' '+ res.property_number;

        this.unassignedRequest.push(res);

        if ( res.id_document_type === 1 ) {
          this.documentsDom.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext});

        }
        else if ( res.id_document_type === 2 ) {
          this.documentsPre.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext})
        }

      })

    })
  }

  reasignDate(idRequest: any) {

    this.datesService.reasignRequest(idRequest).subscribe((result) => {
    },
    error => {


    },
    () => {

      this.errors = false
      let title= "Reprogramar Cita";
      let message = "El Asistente Social se pondra en contacto con usted a través de una llamada telefónica para acordar una nueva fecha y hora de la visita.";
      this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      this.router.navigate(['/solicitud/solicitudes-de-inscripcion']);


    });

  }

  confirmDate(idRequest: any){

    this.datesService.confirmRequest(idRequest).subscribe((result) => {
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

    this.modalService.openModalData(VisitorDataComponent, this.unassignedRequest[0]?.rut_assistant)
  }
}
