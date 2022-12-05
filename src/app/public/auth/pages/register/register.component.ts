import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { ValidateEmailComponent } from '../validate-email/validate-email.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
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


  public locations: any[]= [];

  public selectedStreet: any = null;


  public property_types: any[]= [];

  public selectedHousing: any = null;


  public preventions_types: any[];

  public selectedPrevention: any = null;


  public preventions_types_details: any[];

  public preventions_types_details2: any[];

  public preventions_types_details3: any[];

  public selectedpreventions_types_details: any = "";


  public haveInsurance: any[];

  public selectedhaveInsurance: any = null;

  public id_document_type: any[];

  public selectedid_document_type: any = null;


  public emailUser: any = '';

  rutSubscription: Subscription;

  private rut: string = '';

  private detailPrevention: any;

  public file: File;
  public selectFiles: any[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalsService,
    private authServices: AuthService,
    private routerQuery: ActivatedRoute
    ) {

      this.selectFiles = [];


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

      this.locations = [];

      this.property_types = []

      this.preventions_types= [];

      this.preventions_types_details= [];
      this.preventions_types_details2= [];
      this.preventions_types_details3= [];



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

      this.id_document_type= [
        {
          'id': 1 ,
          'name': 'Domicilio'
        },
        {
          'id': 2,
          'name': 'Preision'
        }
      ];


      this.rutSubscription = this.routerQuery.queryParams.subscribe(rut => this.rut= rut.rut)

      console.log(this.rut)




    }

  ngOnInit(): void {

    this.isFormSubmitted = false;


    this.authServices.dropdownInfo().subscribe((result) => {

      console.log(result)

      this.locations = result.locations;
      this.preventions_types = result.preventions_types;

      result.preventions_types_details.map((res: any) => {
        if (res.id_prevention_type === 1) {
          this.preventions_types_details.push(res);
        } else if (res.id_prevention_type === 2) {
          this.preventions_types_details2.push(res);

        }else {
          this.preventions_types_details3.push(res);
        }
      });

      this.property_types = result.property_types








    }, error => {

    },
    () =>{

    })



    let password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]);

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
        locations: ['', Validators.required],
        numberStreet: ['', [Validators.required, CustomValidators.number]],
        property_types: ['', Validators.required],
        nameHome: ['', Validators.required],
      }),

      healthInformation: this.fb.group({
        preventions_types: ['', Validators.required],
        preventions_types_details: ['', ],
        // typeOfCompany: ['', ],
        haveInsurance: ['', Validators.required]
      }),

      // documents: this.fb.group({
      //   preventionCertificate: ['', Validators.required],
      //   proofOfAddress: ['', Validators.required],
      //   proofOfAddress1: ['', Validators.required],
      // }),
      documents: this.fb.array([]),

      accesData: this.fb.group({
        password: password,
        rePassword: ['', [Validators.required, CustomValidators.equalTo(password)]],
      }),
      authCheck: ['',[Validators.required]]
    })



  }

  get documents() {
    return this.userRegister.controls["documents"] as FormArray;
  }


  addDocument() {
    console.log(1)
    const documentForm = this.fb.group({
        document_path: ['', Validators.required],
        id_document_type: ['', Validators.required]
    });


    this.documents.push(documentForm);

  }

  deleteDocument(DocumentIndex: number) {
    this.documents.removeAt(DocumentIndex);
}


  modalValidateEmail(email: any) {
    this.modalService.openModalData(ValidateEmailComponent, email);
  }

  onRegister(e: Event) {
    console.log(this.userRegister);

    // if (this.userRegister.controls.healthInformation.controls.preventions_types.value === 0) {
    //   this.detailPrevention = this.userRegister.controls.healthInformation.value.preventions_types_details;
    // }
    // else if (this.userRegister.controls.healthInformation.controls.preventions_types.value === 1){
    //   this.detailPrevention = this.userRegister.controls.healthInformation.value.typeOfCompany;

    // }else {

    // }

    const dataUser = {
      rut : this.rut,
      names: this.userRegister.value.names,
      lastname: this.userRegister.value.lastNames,
      f_nac: this.userRegister.value.datesBirth,
      email: this.userRegister.value.email,
      landline: this.userRegister.value.landLine,
      mobile_phone: this.userRegister.value.mobilePhone,
      password: this.userRegister.controls.accesData.value.password,

      id_location: this.userRegister.controls.address.value.locations,
      way_number: this.userRegister.controls.address.value.numberStreet,
      id_property_type: this.userRegister.controls.address.value.property_types,
      property_number: this.userRegister.controls.address.value.nameHome,
      id_prevention_type_detail : this.detailPrevention,
      assurance: this.userRegister.controls.healthInformation.value.haveInsurance,

      terms_condition: this.userRegister.value.authCheck,

      id_status: 1,
      applicant_at_home: false,
      prevention_is_valid: false,
      location_is_valid: false,
      comments: null,
      is_active: false,
      rut_match: false,

    }


    this.authServices.register(dataUser).subscribe(result => {
      console.log(result);
    },
    error => {
      this.errors=error;
      console.log('errors_login->',this.errors);
      if( this.errors == '{"email":["The email has already been taken."]}'){
        let title= "";
        let message = "El correo electrónico que introdujo ya se encuentra asociado a otro usuario. Por favor verifique e intente nuevamente";
        this.modalService.OpenModalError2(ModalComponent, true, title, message);
      }
      this.isFormSubmitted = true;

    },
    () => {
      e.preventDefault();

      this.emailUser = this.userRegister.value.email;
      this.modalValidateEmail(this.emailUser);
      this.router.navigate(['auth/login']);

    });

  }

  dataFile(event: any, index: any, id_document_type: any) {
    this.file = <File>event.target.files[0];
    this.selectFiles.push({'fileData': this.file, 'id_document_type': id_document_type});
    console.log(this.selectFiles);
  }


  uploadFiles() {

    this.selectFiles.map((file) => {

      let fileData = file.fileData;
      let id_document_type = file.id_document_type

      this.authServices.uploadFiles(fileData, id_document_type).subscribe((res) =>
         {
            console.log(res);
        })
    })



    // this.files.forEach( file => {
    //   console.log(file.document_path)
    //   id_document_type = file.id_document_type;
    //   console.log(id_document_type)
    //   formfileData.append('document_path', file.document_path.name);
    //   console.log(formfileData);


    //   this.authServices.uploadFiles(id_document_type, formfileData).subscribe((res) =>
    //      {
    //         console.log(res);
    //     })
    // })




    // let documents = this.userRegister.controls.documents.value;
    //   console.log(documents);

    // this.files.map((res: any) => {

    //   console.log(res)

    //    this.authServices.uploadFiles(res.id_document_type, res.file.file.name).subscribe((res) =>
    //    {
    //       console.log(res);
    //   })

    // })
  }




  ngOnDestroy() {
    this.rutSubscription.unsubscribe();
  }

  openTerminosyCondiciones(){
    this.modalService.openModal(TermsAndConditionsComponent)
  }
  openPoliticadePrivacidad(){
    this.modalService.openModal(PrivacyPolicyComponent)
  }





}
