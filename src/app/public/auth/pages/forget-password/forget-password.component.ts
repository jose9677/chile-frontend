import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ForgetPasswordComponent implements OnInit {


  public errors: any = null;

  public isFormSubmitted: boolean;

  emailUser: any = '';


  public formForgetPassword = this.fb.group ({
    rutNumber: ['',[Validators.required]],
  })

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router



  ) { }

  ngOnInit(): void {
  }

  validateUser(e: Event) {

    this.correctRut();


    const dataForgetPassword = {
      rut: (this.formForgetPassword.value.rutNumber).toUpperCase(),
    }

    if (this.formForgetPassword.status == "VALID") {

      this.isFormSubmitted = true;

      this.authService.validateUser(dataForgetPassword).subscribe( result => {
      },
      error => {  //recibe error del user services
        this.errors = error;
        // modal
        if(this.errors='{ error: "User Does Not exists in Data Base" }'){
          this.formForgetPassword.reset();
          this.errors = true;
          let title: any = 'Usuario no registrado';
          let message: any  = 'El Rut que introdujo no se encuentra registrado en el sistema';
          this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);
          this.isFormSubmitted = false;
        } else {

          this.formForgetPassword.reset();
          this.errors = true;
          let title: any = 'Rut Invalido';
          let message: any  = 'El Rut que introdujo no es correcto, por favor verifique e intente nuevamente';
          this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);
          this.isFormSubmitted = false;
        }

      },
      () => {
        // modal
        this.emailUser = 'su Correo Electronico'
        let title: any = 'Recuperar Contraseña';
        let message: any = 'Hemos enviado un mensaje con instrucciones a su Correo Electónico. Si no lo encuentra en su bandeja de entrada, recuerde revisar en el correo no deseado';
        this.modalService2.OpenModalError2(ModalComponent, false, title, message)

        this.modalService.close();
        this.router.navigate(['/auth/login']);

      });

    }



  }

  correctRut(): any {

    if ((this.formForgetPassword.value.rutNumber != '')) {

      let rut = this.formForgetPassword.value.rutNumber;

      rut = rut.replace(/\-/g, "");
      rut = rut.replace(/\.|,/g, "");

      let code = rut.slice(-1);

      let correctRut = rut.slice(0, -1) + "-" + code;

      this.formForgetPassword.controls['rutNumber'].setValue(correctRut);


    }

  }

}
