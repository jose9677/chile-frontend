import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ModalsService } from '../../../../shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { ValidateEmailComponent } from '../validate-email/validate-email.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errors: any = null;

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

  public emailUser: any = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalsService,
    private authServices: AuthService
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
          'name': 'Na'
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
          'name': 'Na'
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
      names: ['',[Validators.required, ]],
      // names: ['',[Validators.required, Validators.pattern("^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$")]],
      lastNames: ['', [Validators.required, ]],
      // lastNames: ['', [Validators.required, Validators.pattern("^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$")]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      address: this.fb.group({
        // typeOfRoad: ['', Validators.required],
        nameOfstreet: ['', Validators.required],
        numberStreet: ['', [Validators.required, CustomValidators.number]],
        typeOfHousing: ['', Validators.required],
        nameHome: ['', Validators.required],
      }),
      healthInformation: this.fb.group({
        typeOfPrevention: ['', Validators.required],
        typeOfFonasa: ['', ],
        typeOfCompany: ['', ],
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

  modalValidateEmail(email: any) {
    this.modalService.openModalData(ValidateEmailComponent, email);
  }


  // onRegister(e: Event) {
  onRegister(e: Event) {
    console.log(this.userRegister)

    const dataUser = {
      names: this.userRegister.value.names,
      lastNames: this.userRegister.value.lastNames,
      datesBirth: this.userRegister.value.datesBirt,
      email: this.userRegister.value.email,
      landLine: this.userRegister.value.landLine,
      mobilePhone: this.userRegister.value.mobilePhone,
      address: {
        typeOfRoad: this.userRegister.controls.address.value.typeOfRoad,
        nameOfstreet: this.userRegister.controls.address.value.nameOfstreet,
        numberStreet: this.userRegister.controls.address.value.numberStreet,
        typeOfHousing: this.userRegister.controls.address.value.typeOfHousing,
        nameHome: this.userRegister.controls.address.value.nameHome,
      },
      healthInformation: {
        typeOfPrevention: this.userRegister.controls.healthInformation.value.typeOfPrevention,
        typeOfFonasa: this.userRegister.controls.healthInformation.value.typeOfFonasa,
        typeOfCompany: this.userRegister.controls.healthInformation.value.typeOfCompany,
        haveInsurance: this.userRegister.controls.healthInformation.value.haveInsurance
      },
      documents: {
        proofOfAddress: this.userRegister.controls.documents.proofOfAddress,
        proofOfAddress1: this.userRegister.controls.documents.proofOfAddress1
      },
      authCheck: this.userRegister.value.authCheck
    }

    console.log(dataUser)


    this.authServices.register(dataUser).subscribe(result => {
      console.log(result);
    },
    error => {
      this.errors = true
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);



    },
    () => {
      this.isFormSubmitted = true;
      e.preventDefault();
      localStorage.setItem('isLoggedin', 'true');
      if ((localStorage.getItem('isLoggedin'))) {
        this.emailUser = this.userRegister.controls.email.value
        console.log(this.emailUser)
        this.modalValidateEmail(this.emailUser);
        // this.router.navigate(['/']);
      }

    });


  }


}
