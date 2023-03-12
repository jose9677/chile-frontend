import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
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

  public documentsPre: any[];

  public documentsDom: any[];

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

    this.documentsDom = [];

    this.documentsPre = [];

    this.dataRequest= [];

    this.listRutSocialAssistant= [];
    this.supUser = window.sessionStorage.getItem("auth-user");
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

      console


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


      dataRequest.map((res:any) => {

        if ( res.id_document_type === 1 ) {
          this.documentsDom.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext});

        }
        else if ( res.id_document_type === 2 ) {
          this.documentsPre.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext})
        }
      })

    })



  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

  return() {
    this.router.navigate(['/solicitud/asignar-asistente-social'])

  }

  assignSocialAssistant(rutSocialAssistant: any, e: Event) {

    e.preventDefault();
    this.isFormSubmitted = true

    const assignData: any = {

      'rut': rutSocialAssistant

    }
    this.dateService.assignSocialAssistant(this.idRequest, assignData).subscribe(result => {
    },
    error => {
      this.errors = false;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {

      this.errors = false;
      let title= "Asistente Social Asignado";
      let message = "El Asistente Social fue asignado de forma exitosa";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

      this.isFormSubmitted = false;

      this.return();



    });
  }

}
