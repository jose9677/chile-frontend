import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from '../../../../shared/sevices/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';

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
  ) { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
  }

  confirmRut(e: Event) {
    this.isFormSubmitted = true;
    if (!this.formRutUser.invalid) {
      this.modalService.close()
      this.router.navigate(['/auth/register']);
    }else{
      this.errors= true;
      let title: string = "Rut Incorrecto"
      let message = "El Rut ingresado no es correcto, por favor verifique y vuelva a intentarlo";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);

    }

  }


}
