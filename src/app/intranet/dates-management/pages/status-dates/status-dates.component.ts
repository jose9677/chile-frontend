import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatesService } from '../../shared/services/dates.service';

@Component({
  selector: 'app-status-dates',
  templateUrl: './status-dates.component.html',
  styleUrls: ['./status-dates.component.scss']
})
export class StatusDatesComponent implements OnInit {

  public errors: any = null;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  private dataRequest: any;

  public unassignedRequest: any[];



  constructor(
    private routerQuery: ActivatedRoute,
    private router: Router,
    private dateService: DatesService

  ) {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.unassignedRequest = [];


    const DataRequest: any = [
      {
      "rut": "6102995-K",
      "names": "Esmeralda",
      "lastname": "Fuentes",
      "id_request": 3,
      "id_prevention_type_detail": 1,
      "visit_date": "2022-11-30 00:00:00",
      "solicitude_date": "2022-11-30 02:27:50",
      "request_date": "2025-09-05",
      "prevention_detail": "A",
      "prevention_type": "FONASA",
      "id_status": 5,
      "status": "REPROGRAMAR",
      "visitor_rut": "31179870-6",
      "employee_name": "Harry",
      "employee_lastname": "Potter",
      "id_document": 2,
      "document_path": "C:\\xampp\\tmp\\phpC537.tmp",
      "document_type": "DOMICILIO",
      "way_number": 1212,

      }
    ]

    this.dataRequest = DataRequest;


  }

  ngOnInit(): void {

    this.dateService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)

      if (result.length === 0 || this.errors === true) {
        result = this.dataRequest
        console.log(result);
      }else {
        result = result
      }

      result.map((res: any)=>{
        res.fullName = res.employee_name +' '+ res.employee_lastname;
        res.fullNameUser = res.name +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' Tipo: '+ res.prevention_detail;
        res.fullDirection = res.way_number + 'faltan';

        this.unassignedRequest.push(res);
      })
      console.log(this.unassignedRequest)


    },
    error => {

      this.errors = true;

      this.dataRequest.map((res: any)=>{
        res.fullName = res.employee_name +' '+ res.employee_lastname;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' Tipo: '+ res.prevention_detail;
        res.fullDirection = res.way_number + 'falta calle';
        this.unassignedRequest.push(res);
      })
      console.log(this.unassignedRequest)

      // let title= "Registro Invalido";
      // let message = "No se pudo realizar el registro del Usuario";
      // this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      // this.isFormSubmitted = true;

    },
    () => {


    });
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }


  return() {
    this.router.navigate(['/solicitud/solicitudes-de-inscripcion'])

  }

}
