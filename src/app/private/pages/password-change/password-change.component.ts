import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'ngx-custom-validators';
import { PrivateService } from '../../share/services/private.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  @Input() data: any;

  public rutUser: any;

  public isFormSubmitted: boolean;

  public passwordForm: any;

  constructor(
    private fb: FormBuilder,
    private modalActive: NgbActiveModal,
    private privateService: PrivateService,
    private modalService: ModalsService,
    private router: Router
  ) {

    this.isFormSubmitted = false;

  }

  ngOnInit(): void {

    this.rutUser = this.data;

    let password = this.fb.control ('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]);


    this.passwordForm = this.fb.group({
      password: password,
      rePassword: ['', [Validators.required, CustomValidators.equalTo(password)]]
    });
  }

  changePassword() {
    this.isFormSubmitted = true;

    if (this.passwordForm.status !== 'VALID') return;

    const newPassword = {

      password: this.passwordForm.value.password

    }


    this.privateService.changePassword( newPassword, this.rutUser).subscribe((result) => {

    },
    error => {

    },
    () => {

      const title: string = ''
      const message: string = "Contraseña actualizada exitosamente";
      this.modalService.OpenModalError2(ModalComponent, false, title, message);

      this.modalActive.close();

      this.router.navigate(['seguridad/vecinos']);

    })
  }

  cancel(e: Event) {

    e.preventDefault();

    this.modalActive.dismiss();

  }

}
