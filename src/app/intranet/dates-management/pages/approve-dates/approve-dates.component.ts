import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  public dataRequest: any[];

  public formApprove = this.fb.group ({
    applicantAtResidence: ['', []],
    validPreventionCertificate: ['', []],
    validProofOfAddress: ['', []],
    DoesRUTMatch: ['', []],
    Observations: ['', []]

  })



  constructor(
    private modalService: ModalsService,
    private routerquery: ActivatedRoute,
    private router: Router,
    private datesService: DatesService,
    private fb: FormBuilder

  ) {

    this.idRequestSubscription = this.routerquery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.dataRequest = [];

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
        res.fullDirection = res.street + ' ' + res.way_number + ', ' + res.description + ' ' + res.property_number;


        this.dataRequest.push(res);
      })

    })

  }

  approve( e: Event ) {

    console.log(this.formApprove);

    this.openGenerateCredential();

  }

  openGenerateCredential() {
    this.modalService.openModal(GenerateCredentialComponent);
  }
  openRejectRequestComponent(){
    this.modalService.openModal(RejectRequestComponent);
  }

  return() {
    this.router.navigate(['/solicitud/asignar-cita'])

  }


  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

}
