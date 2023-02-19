import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-enter-rut',
  templateUrl: './enter-rut.component.html',
  styleUrls: ['./enter-rut.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnterRutComponent implements OnInit {

  public errors: any = null;

  rut : any;

  public rutNumber: any;

  public isFormSubmitted: boolean;

  public formRutUser = this.fb.group({
    rutNumber: ['',[Validators.required]],
  })

  constructor(
    private fb : FormBuilder,
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private router : Router,
    private authServices: AuthService
  ) {
    this.rutNumber = "";
  }

  ngOnInit(): void {
    this.isFormSubmitted = false;
  }

  confirmRut(e: Event) {
    e.preventDefault();

    this.correctRut()

    // setTimeout(this.correctRut(), 10000);


    this.rut = this.formRutUser.value.rutNumber;
    this.rut = this.rut.replace(/\.|,/g, "");

    const dataRutUser= {
      rut: this.rut
    }

    console.log(this.rut)


    if ( this.formRutUser.status == "VALID") {

      this.isFormSubmitted = true;


      this.authServices.validateRut(dataRutUser).subscribe( result => {
        console.log(result)
      },
      error => {  //recibe error del user services
        console.log(error.error);
        // console.log(error.errors['rut'][0]);
        console.log(error.message);


        if (error.error == "Users exists in DB") {

          this.isFormSubmitted = false;

          this.errors= true;
          let title: string = "Usuario Registrado"
          let message = "El Rut ingresado ya esta registrado, por favor verifique y vuelva a intentarlo";
          this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);
        }

        else if ( error.error == 'User registered incompleted in DB ') {

          this.isFormSubmitted = false;

          this.modalService.close();

          this.router.navigate(['/auth/registro'], { queryParams: { rut: this.rut } });

        }

        else{

          this.isFormSubmitted = false;

          console.log('caso 3');

          this.errors= true;
          let title: string = "RUT Invalido"
          let message = "El Rut ingresado es invalido, por favor verifique y vuelva a intentarlo";
          this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

        }



      },
      () => {

        this.isFormSubmitted = false;
        this.modalService.close()
        this.router.navigate(['/auth/registro'], { queryParams: { rut: this.rut } });


      });
    }

  }

  correctRut(): any {

    if ((this.formRutUser.value.rutNumber != '')) {

      let rut = this.formRutUser.value.rutNumber;

      rut = rut.replace(/\-/g, "");
      rut = rut.replace(/\.|,/g, "");

      let code = rut.slice(-1);

      let correctRut = rut.slice(0, -1) + "-" + code;

      this.formRutUser.controls['rutNumber'].setValue(correctRut);


    }

  }



}
