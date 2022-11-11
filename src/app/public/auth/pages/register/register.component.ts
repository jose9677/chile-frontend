import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userRegister: FormGroup;
  public isFormSubmitted: Boolean;
  public typeOfPrevention: string[];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    ) {
      this.typeOfPrevention= ['fonasa', 'Otros']
    }

  ngOnInit(): void {

    this.userRegister= this.fb.group({
      names: ['',[Validators.required, Validators.pattern("^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$")]],
      lastNames: ['', [Validators.required, Validators.pattern("^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$")]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      address: this.fb.group({
        typeOfRoad: ['', Validators.required],
        nameOfstreet: ['', Validators.required],
        numberstreet: ['', Validators.required],
        home: ['', Validators.required],
        nameHome: ['', Validators.required],
      }),
      healthInformation: this.fb.group({
        typeOfPrevention: ['', Validators.required],
        typeOfFonasa: ['', Validators.required],
        haveInsurance: ['', Validators.required]
      }),
      documents: this.fb.group({
        preventionCertificate: ['', Validators.required],
        proofOfAddress: ['', Validators.required]
      }),
      authCheck: ['',[Validators.required]]
    })

    console.log(this.userRegister)

    this.isFormSubmitted = false;

  }

  proofOfAddress() {
    console.log('acepto Terminos');
  }
  // onRegister(e: Event) {
  onRegister(e: Event) {
    console.log(this.userRegister)
    this.isFormSubmitted = true;
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      // this.router.navigate(['/']);
    }
  }



}
