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

  // public userRegister: FormGroup;
  public userRegister: any;

  public isFormSubmitted: Boolean;

  public typeOfPrevention: any[];

  public typeOfRoad: any[]= [];

  public selectedRoadId: any = null;

  public nameOfstreet: any[]= [];

  public selectedStreet: any = null;

  public typeOfHousing: any[]= [];

  public selectedHousing: any = null;




  constructor(
    private router: Router,
    private fb: FormBuilder,
    ) {

      this.typeOfRoad = [
        {
          'id': 0 ,
          'name': 'Calle'
        },
        {
          'id': 1,
          'name': 'Avenida'
        }
      ];

      this.nameOfstreet = [
        {
          'id': 0 ,
          'name': 'Calle#1'
        },
        {
          'id': 1,
          'name': 'Calle#2'
        }
      ];

      this.typeOfHousing = [
        {
          'id': 0 ,
          'name': 'Casa'
        },
        {
          'id': 1,
          'name': 'Departamento'
        }
      ]

      this.typeOfPrevention= [
        {
          'id': 0 ,
          'name': 'Fonasa'
        },
        {
          'id': 1,
          'name': 'Isapre'
        }
      ];
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
        numberStreet: ['', [Validators.required, CustomValidators.number]],
        typeOfHousing: ['', Validators.required],
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
