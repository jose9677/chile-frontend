import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from '../../../../shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class RecoveryComponent implements OnInit {

  public errors: any = null;

  public isFormSubmitted: boolean;

  emailUser: any = '';

  public url1: any;
  public urlParams: any;
  public tokenUrl: any;


  public formRecoveryPassword = this.fb.group ({
    password: ['',[Validators.required]],
    rePassword: ['',[Validators.required]]
  })

  constructor(
    // public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
  }

  recoveryPassword(e: Event) {


    // obtiene la url
    this.url1 = this.router.parseUrl(this.router.url);
    console.log(1+'->'+this.url1)
    // obtiene el valor del token
    this.tokenUrl = this.url1.queryParams['api_token'];
    console.log(2+'->'+this.tokenUrl)

    this.isFormSubmitted = true;
    console.log(this.formRecoveryPassword);

    const dataRecoveryPassword = {
      password: this.formRecoveryPassword.value.password,
      api_token: this.tokenUrl
    }

    this.authService.recoveryPassword(dataRecoveryPassword).subscribe(result => {
      console.log(result)

    },
    error => {  //recibe error del user services
      this.errors = error;
      console.log('errors_login->',this.errors);
      // modal
      this.formRecoveryPassword.reset();
      this.errors = true;
      let title: any = 'Clave Invalida';
      let message: any  = `La clave que introdujo no es correcta, por favor verifique e intente nuevamente`;
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);



    },
    () => {
      this.isFormSubmitted = true;
      // modal
      console.log(this.formRecoveryPassword)


      // this.router.navigate([this.returnUrl]);
      this.emailUser = 'su Correo Electronico'
      let title: any = 'Recuperar Contraseña';
      let message: any = `Hemos enviado un mensaje con instrucciones a ${this.emailUser}. Si no lo encuentra en su bandeja de entrada, recuerde revisar en el correo no deseado `;
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message)

      // this.modalService.close();
      this.router.navigate(['/auth/login']);

    });

  }

}
