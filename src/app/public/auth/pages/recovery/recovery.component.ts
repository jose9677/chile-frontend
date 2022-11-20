import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from '../../../../shared/sevices/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RecoveryComponent implements OnInit {

  public errors: any = null;

  public isFormSubmitted: boolean;

  emailUser: any = '';


  public formRecoveryPassword = this.fb.group ({
    rutUser: ['',[Validators.required]]
  })

  constructor(
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
  }

  recoveryPassword(e: Event) {
    this.isFormSubmitted = true;
    console.log(this.formRecoveryPassword);

    if (!this.formRecoveryPassword.invalid) {
      this.emailUser = 'Eduyeoh@gmail.com'
      let title: any = 'Recuperar Contraseña';
      let message: any = `Hemos enviado un mensaje con instrucciones a ${this.emailUser}. Si no lo encuentra en su bandeja de entrada, recuerde revisar en el correo no deseado `;
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message)

      this.modalService.close();
      this.router.navigate(['/auth/login']);
    }else {
      this.errors = true;
      let title: any = 'Clave Invalida';
      let message: any  = `La clave que introdujo no es correcta, por favor verifique e intente nuevamente`;
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    }

  }

}
