import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { PasswordChangeComponent } from '../password-change/password-change.component';

@Component({
  selector: 'app-view-neighbor',
  templateUrl: './view-neighbor.component.html',
  styleUrls: ['./view-neighbor.component.scss']
})
export class ViewNeighborComponent implements OnInit {

  public isFormSubmitted: boolean;

  public dataUserForm: any;

  public maxDate: any;
  public minDate: any;

  public mask: any;
  public prefix: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: ModalsService
  ) {

    this.maxDate = new Date()
    this.maxDate = `${this.maxDate.getFullYear() - 1}-${(this.maxDate.getMonth())+1}-${this.maxDate.getDate()}`

    this.minDate = new Date();
    this.minDate = `${this.minDate.getFullYear() - 124 }-${(this.minDate.getMonth())+1}-${this.minDate.getDate()}`;

    this.prefix = '';
    this.mask = '';

  }

  ngOnInit(): void {

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

  }

  changeinPhoneNumber(value: any, typeNumber: any) {

    if (value || value === 0) {
      if (value === 0 && typeNumber === 1) this.dataUserForm.controls.landLine.setValue('');

      if (value === 0 && typeNumber === 2) this.dataUserForm.controls.mobilePhone.setValue('');
    }
  }

  changePassword( e: Event ) {

    e.preventDefault();

    this.modalService.openModalData3(PasswordChangeComponent, this.dataUserForm.value.rut, null, null);

  }

  cancel(e: Event) {

    e.preventDefault();

    this.router.navigate(['/seguridad/vecinos']);

  }

}
