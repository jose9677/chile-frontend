import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from '../../../../shared/services/modals.service';
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

  public isFormSubmitted: boolean;

  public formRutUser = this.fb.group({
    rutUser: ['',[Validators.required]]
  })

  constructor(
    private fb : FormBuilder,
    public modalService: NgbActiveModal,
    private modalService2: ModalsService,
    private router : Router,
    private authServices: AuthService
  ) { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
  }

  confirmRut(e: Event) {

    const dataRutUser= {
      rut: this.formRutUser.value.rutUser
    }

    this.authServices.validateRut(dataRutUser).subscribe( result => {
      console.log(result)
    },
    error => {  //recibe error del user services
      this.errors= true;
      let title: string = "Rut Incorrecto"
      let message = "El Rut ingresado no es correcto, por favor verifique y vuelva a intentarlo";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);


    },
    () => {

      this.modalService.close()
      this.router.navigate(['/auth/register'], { queryParams: { rut: this.formRutUser.value.rutUser } });


    });
  }


}
