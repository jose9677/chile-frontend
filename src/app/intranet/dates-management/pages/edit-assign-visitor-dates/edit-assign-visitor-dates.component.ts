import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/views/pages/ui-components/modal/modal.component';
import { DatesService } from '../../shared/services/dates.service';

@Component({
  selector: 'app-edit-assign-visitor-dates',
  templateUrl: './edit-assign-visitor-dates.component.html',
  styleUrls: ['./edit-assign-visitor-dates.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EditAssignVisitorDatesComponent implements OnInit {


  private idRequestSubscription: Subscription;

  private errors: any = null;

  public isFormSubmitted: boolean;


  public idRequest: any;
  public dateCreate: any;
  public status: any;
  public idStatus: any;
  public fullName: any;
  public dateVisit: any;
  public rut: any;
  public rutSocialAssistant: any;
  public addres: any;
  public landLine: any;
  public mobilePhone: any;
  public typePrevention: any;

  public supUser: any;

  public fullNames:any;

  public dataRequest: any[];

  public listRutSocialAssistant: any[];

  public selecterutSocialAssistant: any = null;

  formAssignSocialAssistant: any = this.fb.group({
    rutSocialAssistant: ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    private routerQuery: ActivatedRoute,
    private dateService: DatesService,
    private modalService2: ModalsService,
    private fb: FormBuilder

  ) {

    this.dataRequest= [];

    this.listRutSocialAssistant= [];
    this.supUser = window.sessionStorage.getItem("auth-user");
    console.log(this.supUser)
  }

  ngOnInit(): void {

    this.isFormSubmitted = false;

    this.idRequestSubscription= this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.dateService.getEmployees(this.supUser.replace(/["']/g, "")).subscribe(result => {

      let res1: any[] = [];

      result.map((res: any) => {
        res.fullNames = res.names +' '+ res.lastname;
        res1.push(res);
      })

      return this.listRutSocialAssistant = res1;

    },
    error => {
      this.errors = true;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {

    });

    this.dateService.getForIdRequest(this.idRequest).subscribe(dataRequest => {

      console.log(dataRequest)



      this.dataRequest = dataRequest;
      this.dateCreate = dataRequest[0]?.request_date;
      this.status = dataRequest[0]?.status;
      this.idStatus = dataRequest[0]?.id_status;
      this.fullNames = dataRequest[0]?.names + ' ' + dataRequest[0]?.lastname;
      this.dateVisit = dataRequest[0]?.visit_date;
      this.addres = dataRequest[0]?.street + ' ' + dataRequest[0]?.way_number + ' ' + dataRequest[0]?.description + ' ' + dataRequest[0]?.property_number;
      this.rut = dataRequest[0]?.rut;
      this.landLine = dataRequest[0]?.landline;
      this.mobilePhone = dataRequest[0]?.mobile_phone;

      this.typePrevention = dataRequest[0]?.prevention_type +' - '+ dataRequest[0]?.prevention_detail;

      this.selecterutSocialAssistant = dataRequest[0]?.rut_assistant;


    })

    console.log(this.listRutSocialAssistant);
    console.log(this.selecterutSocialAssistant);


  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

  return() {
    this.router.navigate(['/solicitud/asignar-asistente-social'])

  }

  assignSocialAssistant(rutSocialAssistant: any, e: Event) {

    this.isFormSubmitted = true

    const assignData: any = {

      'rut': rutSocialAssistant

    }
    this.dateService.assignSocialAssistant(this.idRequest, assignData).subscribe(result => {
      return console.log(result);
    },
    error => {
      this.errors = false;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {


      this.isFormSubmitted = false;
      e.preventDefault();
      console.log(this.listRutSocialAssistant);
      console.log(this.selecterutSocialAssistant);


    });
  }

}
