import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { PasswordChangeComponent } from '../password-change/password-change.component';
import { Subscription } from 'rxjs';
import { PrivateService } from '../../share/services/private.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';

@Component({
  selector: 'app-view-neighbor',
  templateUrl: './view-neighbor.component.html',
  styleUrls: ['./view-neighbor.component.scss']
})
export class ViewNeighborComponent implements OnInit {

  private rutUseSubscription: Subscription;

  public isFormSubmitted: boolean;

  public dataUserForm: any;

  private rutNeighbor: any;

  public maxDate: any;
  public minDate: any;

  public mask: any;
  public prefix: any;

  constructor(
    private privateService: PrivateService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: ModalsService,
    private routerQuery: ActivatedRoute,

  ) {

    this.maxDate = new Date()
    this.maxDate = `${this.maxDate.getFullYear() - 1}-${(this.maxDate.getMonth())+1}-${this.maxDate.getDate()}`

    this.minDate = new Date();
    this.minDate = `${this.minDate.getFullYear() - 124 }-${(this.minDate.getMonth())+1}-${this.minDate.getDate()}`;

    this.prefix = '';
    this.mask = '';

  }

  ngOnInit(): void {

    this.rutUseSubscription = this.routerQuery.queryParams.subscribe(rut_user => this.rutNeighbor = rut_user.rut);

    this.mask = '0  0000 - 0000';
    this.prefix = '+56  ';

    this.dataUserForm = this.fb.group({
      rut: ['', []],
      names: ['',[ Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
      lastNames: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
      gender: ['', [ Validators.required]],
      datesBirth: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.minLength(9)]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9)]]
    })

    this.getDataUserForRut();

  }

  getDataUserForRut() {

    let dataUser: any[] = [];

    this.privateService.getDataUserForRut(this.rutNeighbor).subscribe((result) => {

      if (result.length === 0) {

        this.router.navigate(['seguridad/vecinos']);

        let title: string = ''
        let message: string = "Este usuario no se encuentra registrado";
        this.modalService.OpenModalError2(ModalComponent, true, title, message);
        return
      }

      const {names, lastname, id_sex, f_nac, email, landline, mobile_phone, origin} = result[0];

      dataUser.push({
        rut: this.rutNeighbor,
        names: names,
        lastNames: lastname,
        gender: id_sex,
        datesBirth: f_nac,
        email: email,
        landLine: landline,
        mobilePhone: mobile_phone,
      })
    },
    error => {

    },
    () => {

      const form: any =  this.dataUserForm.controls;

      form.rut.setValue(dataUser[0]?.rut);
      form.names.setValue(dataUser[0]?.names);
      form.lastNames.setValue(dataUser[0]?.lastNames);
      form.datesBirth.setValue(dataUser[0]?.datesBirth);
      form.email.setValue(dataUser[0]?.email);
      form.landLine.setValue(dataUser[0]?.landLine);
      form.mobilePhone.setValue(dataUser[0]?.mobilePhone);




    })

  }




  changeinPhoneNumber(value: any, typeNumber: any) {

    if (value || value === 0) {
      if (value === 0 && typeNumber === 1) this.dataUserForm.controls.landLine.setValue('');

      if (value === 0 && typeNumber === 2) this.dataUserForm.controls.mobilePhone.setValue('');
    }
  }

  changePassword( e: Event ) {

    e.preventDefault();

    this.modalService.openModalData(PasswordChangeComponent, this.dataUserForm.value.rut);

  }

  cancel(e: Event) {

    e.preventDefault();

    this.router.navigate(['/seguridad/vecinos']);

  }

}
