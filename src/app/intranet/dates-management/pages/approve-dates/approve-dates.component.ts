import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  public isFormSubmitted: boolean;

  private errors: boolean;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  public dataRequest: any[];

  public formApprove = this.fb.group ({
    applicantAtResidence: ['', [ Validators.required ]],
    validPreventionCertificate: ['', [ Validators.required ]],
    validProofOfAddress: ['', [ Validators.required]],
    DoesRUTMatch: ['', [ Validators.required]],
    Observations: ['', [ ]]

  })


  constructor(
    private modalService: ModalsService,
    private routerquery: ActivatedRoute,
    private router: Router,
    private datesService: DatesService,
    private fb: FormBuilder

  ) {

    this.isFormSubmitted = false;

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

  approve( idRequest: any, e: Event ): void {
    e.preventDefault();
    
    this.isFormSubmitted = true;


    const dataRequest = {
      "applicant_at_home": this.formApprove.controls.applicantAtResidence.value,
      "prevention_is_valid": this.formApprove.controls.validProofOfAddress.value,
      "location_is_valid": this.formApprove.controls.DoesRUTMatch.value,
      "rut_match": this.formApprove.controls.DoesRUTMatch.value,
      "comments": this.formApprove.controls.Observations.value

    }

    if ( this.formApprove.status == "VALID" ) {

      this.datesService.approbe(idRequest, dataRequest).subscribe((result) => {
  
        console.log(result)
  
      },
      error => {
  
      },
      () => {
        
        this.openGenerateCredential();

        this.router.navigate(['/solicitud/asignar-cita']);

  
      })
  
      
    }
    

  }

  deny( idRequest: any, e: Event ):void {
    e.preventDefault();

    this.isFormSubmitted = true;

    const dataRequest = {
      "applicant_at_home": this.formApprove.controls.applicantAtResidence.value,
      "prevention_is_valid": this.formApprove.controls.validProofOfAddress.value,
      "location_is_valid": this.formApprove.controls.DoesRUTMatch.value,
      "rut_match": this.formApprove.controls.DoesRUTMatch.value,
      "comments": this.formApprove.controls.Observations.value

    }

    if ( this.formApprove.status == "VALID" ) {

      this.datesService.approbe(idRequest, dataRequest).subscribe((result) => {
  
        console.log(result)
  
      },
      error => {
  
      },
      () => {
      })
      
      this.openRejectRequestComponent()    


    }


  }

  openGenerateCredential() {
    this.modalService.openModal(GenerateCredentialComponent);
  }
  openRejectRequestComponent(){
    this.modalService.openModal(RejectRequestComponent);
  }

  return() {
    this.router.navigate(['/'])

  }


  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

}
