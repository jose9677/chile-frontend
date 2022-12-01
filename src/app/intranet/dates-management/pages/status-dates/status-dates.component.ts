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
        "f_nac": "1999-01-16",
        "email": "vecino5@gmail.com",
        "password": "$2y$10$aQ8PrFuH.hoiNUgIvDHCF.UrFbw2Ux0BFLxGh7QDQ5J3jvhmIG6ey",
        "landline": 2125742371,
        "mobile_phone": 4242218958,
        "employee": false,
        "supervisor_rut": null,
        "otp": null,
        "email_active": true,
        "profile_pic": null,
        "id_rol": 1,
        "remember_token": null,
        "created_at": "2022-11-30 02:27:50",
        "updated_at": "2022-12-01 05:25:44",
        "deleted_at": null,
        "api_token": null,
        "id": 3,
        "rut_user": "6102995-K",
        "id_prevention_type_detail": 1,
        "assurance": true,
        "id_location": 1,
        "way_number": 715,
        "id_property_type": 1,
        "property_number": 1,
        "terms_condition": null,
        "request_date": "2025-09-05 00:00:00",
        "id_status": 5,
        "rut_employee": "31179870-6",
        "visit_date": "2022-11-30 00:00:00",
        "applicant_at_home": true,
        "prevention_is_valid": true,
        "location_is_valid": true,
        "comments": null,
        "is_active": null,
        "rut_match": null
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
