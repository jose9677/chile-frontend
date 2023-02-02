import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { DatesService } from '../../shared/services/dates.service';

@Component({
  selector: 'app-assign-visitor-dates',
  templateUrl: './assign-visitor-dates.component.html',
  styleUrls: ['./assign-visitor-dates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignVisitorDatesComponent implements OnInit {

  @Input () data: any; data2: any;

  private errors: any = null;

  public supUser: any;


  public isFormSubmitted: Boolean;

  public nroRequest: any;
  public assistantRut: any;

  public listRutSocialAssistant: any[];

  public selecterutSocialAssistant: any = null;

  formAssignSocialAssistant: any = this.fb.group({
    rutSocialAssistant: ['', [Validators.required]]
  })

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private fb: FormBuilder,
    private datesService: DatesService
  ) {

    this.listRutSocialAssistant= [];
    this.supUser = window.sessionStorage.getItem("auth-user");

  }

  ngOnInit(): void {

    this.nroRequest= this.data;
    this.assistantRut = this.data2;


    this.datesService.getEmployees(this.supUser.replace(/["']/g, "")).subscribe(result => {

      let res1: any[] = [];

      result.map((res: any) => {

        res.completeNames = res.names +' '+ res.lastname;
        res1.push(res);

      })

      this.listRutSocialAssistant = res1;

      this.selecterutSocialAssistant = this.assistantRut;


    },
    error => {
      this.errors = true;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {



    });



  }

  assignSocialAssistant(rutSocialAssistant: any, e: Event) {
    this.isFormSubmitted = true;
    e.preventDefault();

    const assignData: any = {

      'rut': rutSocialAssistant

    }
    this.datesService.assignSocialAssistant(this.nroRequest ,assignData).subscribe(result => {
    },
    error => {
      this.errors = true;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {

      this.errors = false;
      let title= "Asistente Social Asignado";
      let message = "El Asistente Social fue asignado de forma exitosa";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);


      this.isFormSubmitted = true;

      setTimeout(this.reloadPage, 3000);
    });

  }

  reloadPage() {
    window.location.reload();
  }

}
