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


  public typeOfRoad: any[]= [];

  public selectedRoadId: any = null;


  public nameOfstreet: any[]= [];

  public selectedStreet: any = null;


  public typeOfHousing: any[]= [];

  public selectedHousing: any = null;


  public typeOfPrevention: any[];

  public selectedPrevention: any = null;


  public typeOfFonasa: any[];

  public selectedtypeOfFonasa: any = "";

  public typeOfCompany: any[];

  public selectedTypeOfCompany: any = "";


  public haveInsurance: any[];

  public selectedhaveInsurance: any = null;


  public proofOfAddress: any[];

  public selectedproofOfAddress: any = null;

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

      this.typeOfFonasa= [
        {
          'id': 0 ,
          'name': 'fA'
        },
        {
          'id': 1,
          'name': 'fB'
        },
        {
          'id': 3 ,
          'name': 'fC'
        },
        {
          'id': 4,
          'name': 'fD'
        }
      ];

      this.typeOfCompany= [
        {
          'id': 0 ,
          'name': 'cA'
        },
        {
          'id': 1,
          'name': 'cB'
        },
        {
          'id': 3 ,
          'name': 'cC'
        },
        {
          'id': 4,
          'name': 'cD'
        }
      ];

      this.haveInsurance= [
        {
          'id': 0 ,
          'name': 'Si'
        },
        {
          'id': 1,
          'name': 'No'
        }
      ];

      this.proofOfAddress= [
        {
          'id': 0 ,
          'name': 'Tipo1'
        },
        {
          'id': 1,
          'name': 'Tipo2'
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
        typeOfCompany: ['', Validators.required],
        haveInsurance: ['', Validators.required]
      }),
      documents: this.fb.group({
        preventionCertificate: ['', Validators.required],
        proofOfAddress: ['', Validators.required],
        proofOfAddress1: ['', Validators.required],
      }),
      authCheck: ['',[Validators.required]]
    })


    console.log(this.userRegister)

    this.isFormSubmitted = false;

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
