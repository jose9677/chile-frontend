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

  @Input() data:any;


  emailUser: any= '';

  public errors: any = null;

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
    this.emailUser = this.data;
    console.log(this.data);
    console.log(this.emailUser);

  }

  validateEmail(e: Event) {

    const dataOtp = {
      otp: this.formValidateEmail.value.otpUser,
    }

    this.authService.validateEmail( dataOtp ).subscribe(result => {

      console.log(result)

    },
    error => {
      this.errors = true;
      let message: any = 'La clave que introdujo no es la correcta, por favor verifique e intente nuevamente'
      let title = 'Clave Invalida'
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message)

    },
    () => {
      this.modalService.close();

      this.router.navigate(['/auth/login']);

      let title: any = 'Registro Exitoso'
      let message:any = `Se ha generado una solicitud de forma exitosa. Recibirá un correo electrónico con sus datos de acceso al sistema donde podra consultar el estatus de su solicitud`;
      this.modalService2.OpenModalError2(ModalComponent, this. errors, title, message );

    });


  }

  resendKey() {
    let title: any = "Reenvio de clave de un solo uso"
    let message:any = "Clave de un solo Uso Reenviada a su correo electronico";
    this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

  }

}
