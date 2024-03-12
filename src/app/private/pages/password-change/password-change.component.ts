import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  public isFormSubmitted: boolean;

  public passwordForm: any;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {

    this.isFormSubmitted = false;

   }

  ngOnInit(): void {

    let password = this.fb.control ('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]);


    this.passwordForm = this.fb.group({
      password: password,
      rePassword: ['', [Validators.required, CustomValidators.equalTo(password)]]
    });
  }

  changePassword() {
    this.isFormSubmitted = true;
    console.log(this.passwordForm)
  }

  cancel(e: Event) {

    this.modal.close();

  }

}
