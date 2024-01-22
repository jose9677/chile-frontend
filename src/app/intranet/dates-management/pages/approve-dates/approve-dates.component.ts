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

  public documentsPre: any[];

  public documentsDom: any[];

  public formApprove = this.fb.group ({
    applicantAtResidence: ['', [ Validators.required ]],
    validPreventionCertificate: ['', [ Validators.required ]],
    validProofOfAddress: ['', [ Validators.required ]],
    DoesRUTMatch: ['', [ Validators.required ]],
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

    this.dataRequest = [];

    this.documentsDom = [];

    this.documentsPre = [];

  }

  ngOnInit(): void {

    this.idRequestSubscription = this.routerquery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    // this.datesService.getForIdRequest(this.idRequest).subscribe((result) => {

    //   result.map((res: any)=>{
    //     res.fullName = res.names_assistant +' '+ res.lastname_assistant;
    //     res.fullNameUser = res.names +' '+ res.lastname;
    //     res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail;
    //     res.fullDirection = res.street + ' ' + res.way_number + ', ' + res.description + ' ' + (res.property_number ?? 's/n');

    //     if ( res.id_document_type === 1 ) {
    //       this.documentsDom.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext});

    //     }
    //     else if ( res.id_document_type === 2 ) {
    //       this.documentsPre.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext})
    //     }


    //     this.dataRequest.push(res);
    //   })
    // })

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

      // this.datesService.approbe(idRequest, dataRequest).subscribe((result) => {


      // },
      // error => {

      // },
      // () => {

      //   this.openGenerateCredential();

      //   this.router.navigate(['/solicitud/asignar-cita']);

      // })
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

      this.openRejectRequestComponent( dataRequest, idRequest );

    }
  }

  openRejectRequestComponent( dataRequest: any , idRequest: any ){

    this.modalService.openModalData2(RejectRequestComponent, dataRequest, idRequest);
  }

  openGenerateCredential() {
    this.modalService.openModal(GenerateCredentialComponent);
  }

  return() {
    this.router.navigate(['/solicitud/asignar-cita']);

  }


  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

}
