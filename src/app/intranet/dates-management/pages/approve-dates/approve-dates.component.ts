import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { DatesService } from '../../shared/services/dates.service';
import { GenerateCredentialComponent } from './generate-credential/generate-credential.component';
import { RejectRequestComponent } from './reject-request/reject-request.component';

@Component({
  selector: 'app-approve-dates',
  templateUrl: './approve-dates.component.html',
  styleUrls: ['./approve-dates.component.scss']
})
export class ApproveDatesComponent implements OnInit {

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

    this.datesService.getForIdRequest(this.idRequest).subscribe((result) => {
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

    })

  }

  openGenerateCredential() {
    this.modalService.openModal(GenerateCredentialComponent);
  }
  openRejectRequestComponent(){
    this.modalService.openModal(RejectRequestComponent);
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

  return() {
    this.router.navigate(['/solicitud/solicitudes-de-inscripcion'])

  }
}
