import { typeWithParameters } from '@angular/compiler/src/render3/util';
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
  public rutsup: any;

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
    console.log(this.supUser)

  }

  ngOnInit(): void {


    this.datesService.getEmployees().subscribe(result => {

      let res1: any[] = [];

      result.map((res: any) => {
        if (res.supervisor_rut != this.supUser){
          res.completeNames = res.names +' '+ res.lastname;
          res1.push(res);
          console.log(res1)
        }
      })

      this.listRutSocialAssistant = res1;

    },
    error => {
      this.errors = true;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {

    });

    this.nroRequest= this.data;
    this.rutsup = this.data2;

  }

  assignSocialAssistant(rutSocialAssistant: any, e: Event) {

    const assignData: any = {

      'rut': rutSocialAssistant

    }
    this.datesService.assignSocialAssistant(this.nroRequest ,assignData).subscribe(result => {
      return console.log(result);
    },
    error => {
      this.errors = true;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {


      this.isFormSubmitted = true;
      e.preventDefault();


    });



    console.log(rutSocialAssistant);
    this.isFormSubmitted = true;
    e.preventDefault();

  }
}
