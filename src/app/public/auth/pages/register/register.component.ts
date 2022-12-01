import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { ValidateEmailComponent } from '../validate-email/validate-email.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private today: any;

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

  rutSubscription: Subscription;

  private rut: string = '';

  private detailPrevention: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalsService,
    private authServices: AuthService,
    private routerQuery: ActivatedRoute
    ) {

      this.typeOfRoad = [
        {
          'id': 1 ,
          'name': 'Calle'
        },
        {
          'id': 2,
          'name': 'Avenida'
        }
      ];

      this.nameOfstreet = [
        {
          'id': 1 ,
          'name': 'Calle#1'
        },
        {
          'id': 2,
          'name': 'Calle#2'
        }
      ];

      this.typeOfHousing = [
        {
          'id': 1 ,
          'name': 'Casa'
        },
        {
          'id': 2,
          'name': 'Departamento'
        }
      ]

      this.typeOfPrevention= [
        {
          'id': 1 ,
          'name': 'Fonasa'
        },
        {
          'id': 2,
          'name': 'Isapre'
        }
      ];

      this.typeOfFonasa= [
        {
          'id': 1 ,
          'name': 'Na'
        },
        {
          'id': 2,
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
          'id': 1 ,
          'name': 'Na'
        },
        {
          'id': 2,
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
          'id': true ,
          'name': 'Si'
        },
        {
          'id': false,
          'name': 'No'
        }
      ];

      this.proofOfAddress= [
        {
          'id': 1 ,
          'name': 'Tipo1'
        },
        {
          'id': 2,
          'name': 'Tipo2'
        }
      ];

      this.rutSubscription = this.routerQuery.queryParams.subscribe(rut => this.rut= rut.rut)

      console.log(this.rut)

      this.today = new Date();
    }

  ngOnInit(): void {


    console.log(this.today.toLocaleString())

    let password = new FormControl('', Validators.required);

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
      accesData: this.fb.group({
        // password: ['', [Validators.required]],
        password: password,
        rePassword: ['', [Validators.required, CustomValidators.equalTo(password)]],
      }),
      authCheck: ['',[Validators.required]]
    })






    this.isFormSubmitted = false;

  }

  modalValidateEmail(email: any) {
    this.modalService.openModalData(ValidateEmailComponent, email);
  }


  onRegister(e: Event) {
    console.log(this.userRegister);

    if (this.userRegister.controls.healthInformation.controls.typeOfPrevention.value === 0) {
      this.detailPrevention = this.userRegister.controls.healthInformation.value.typeOfFonasa;
    }
    else if (this.userRegister.controls.healthInformation.controls.typeOfPrevention.value === 1){
      this.detailPrevention = this.userRegister.controls.healthInformation.value.typeOfCompany;

    }else {

    }

    const dataUser = {
      rut : this.rut,
      names: this.userRegister.value.names,
      lastname: this.userRegister.value.lastNames,
      f_nac: this.userRegister.value.datesBirth,
      email: this.userRegister.value.email,
      landline: this.userRegister.value.landLine,
      mobile_phone: this.userRegister.value.mobilePhone,
      password: this.userRegister.controls.accesData.value.password,

      id_location: this.userRegister.controls.address.value.nameOfstreet,
      way_number: this.userRegister.controls.address.value.numberStreet,
      id_property_type: this.userRegister.controls.address.value.typeOfHousing,
      property_number: this.userRegister.controls.address.value.nameHome,

      id_prevention_type_detail : this.detailPrevention,

      assurance: this.userRegister.controls.healthInformation.value.haveInsurance,

      visit_date: this.today.toLocaleString(),

      // preventionCertificate: this.userRegister.controls.documents.preventionCertificate,
      // proofOfAddress: this.userRegister.controls.documents.proofOfAddress,
      // proofOfAddress1: this.userRegister.controls.documents.proofOfAddress1,

      terms_condition: this.userRegister.value.authCheck
    }

    console.log(dataUser);


    this.authServices.register(dataUser).subscribe(result => {
      console.log(result);
    },
    error => {
      this.errors = true;
      let title= "Registro Invalido";
      let message = "No se pudo realizar el registro del Usuario";
      this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      this.isFormSubmitted = true;

    },
    () => {
      e.preventDefault();
      this.emailUser = this.userRegister.value.email;
      this.modalValidateEmail(this.emailUser);
      this.router.navigate(['auth/login']);

    });

  }



  ngOnDestroy() {
    this.rutSubscription.unsubscribe();
  }




}
