import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from '../../../../shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ValidateEmailComponent implements OnInit {

  @Input() data: any; data2: any;


  emailUser: any;
  rutUser: any;

  public errors: boolean;

  public isFormSubmitted: boolean;

  public formValidateEmail = this.fb.group({
    otpUser: ['',[Validators.required]]
  })

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private fb: FormBuilder,
    private router : Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
    this.emailUser = this.data;
    this.rutUser = this.data2;
    console.log(this.data);
    console.log(this.emailUser);

  }

  validateEmail(e: Event) {

    e.preventDefault();
    this.isFormSubmitted = true;


    const dataOtp = {
      otp: this.formValidateEmail.value.otpUser,
    }



    this.authService.validateEmail( dataOtp ).subscribe(result => {

      console.log(result)

    },
    error => {
      this.isFormSubmitted = false;
      this.errors = true;
      let title: any = 'Clave Invalida';
      let message: any = 'La clave que introdujo no es la correcta, por favor verifique e intente nuevamente';
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    },
    () => {
      this.modalService.close();

      this.router.navigate(['/auth/login']);
      let errors: any = false
      let title: any = 'Registro Exitoso';
      let message:any = `Se ha generado una solicitud de forma exitosa. Recibirá un correo electrónico con sus datos de acceso al sistema donde podrá consultar el estatus de su solicitud`;
      this.modalService2.OpenModalError2(ModalComponent, errors, title, message );

    });


  }

  resendKey(e: Event) {

    this.isFormSubmitted = true;
    e.preventDefault();


    let rutUser = {
      "rut": this.rutUser
    }
    console.log(rutUser)

    this.authService.refreshOtp( rutUser ).subscribe((result) => {
      console.log(result);
    },
    error => {

      this.isFormSubmitted = false;

    },
    () => {
      this.isFormSubmitted = false;

      let errors = false;
      let title: any = "Reenvió de clave de un solo uso"
      let message:any = "Clave de un solo Uso Reenviada a su correo electrónico";
      this.modalService2.OpenModalError2(ModalComponent, errors, title, message);

    })
  }

  restartUser(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    let rutUser = this.rutUser;

    console.log(rutUser)

    this.authService.restartUser( rutUser ).subscribe((result) => {
      console.log(result);
    },
    error => {

      this.isFormSubmitted = false;

      console.log(error);

      this.modalService.dismiss();

    },
    () => {

      this.modalService.dismiss();

    } )
  }

}
