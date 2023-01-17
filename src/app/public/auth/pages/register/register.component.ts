import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable, Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { ValidateEmailComponent } from '../validate-email/validate-email.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoggedService } from 'src/app/shared/services/logged.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public today: any;

  public errors: any = null;

  // public userRegister: FormGroup;
  public userRegister: any;

  public isUserRegiter: Observable<boolean>;

  public isFormSubmitted: boolean;

  public documentIsValid: boolean;


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

  public preventions_types_details4: any[];

  public selectedpreventions_types_details: any;


  public haveInsurance: any[];
  public selectedhaveInsurance: any = null;


  public isCaretakerOptions: any[];
  public selectedCaretakerOption = null;

  public reasonOptions: any[];
  public selectedReasonOptions = null;

  public dedicationOptions: any[];
  public selectedDedicationOption= null;

  public remunerationOptions: any[];
  public selectedRemunerationOption= null;


  public emailUser: any = '';

  rutSubscription: Subscription;

  private rut: string = '';


  public file: File;
  public selectFiles: any[];




  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalsService,
    private authServices: AuthService,
    private routerQuery: ActivatedRoute,
    private loggedServices: LoggedService
    ) {

      this.selectedpreventions_types_details = "";

      this.today = new Date()
      this.today = `${this.today.getFullYear()}-${(this.today.getMonth())+1}-${this.today.getDate()}`
      // console.log(this.today)

      this.isCaretakerOptions = [
        {
          'description': "si",
          'value': true
        },
        {
          'description': 'no',
          'value': false
        }
      ]

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
      this.preventions_types_details4= [];



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

      this.rutSubscription = this.routerQuery.queryParams.subscribe(rut => this.rut= rut.rut)

      // console.log(this.rut)




    }

  ngOnInit(): void {

    this.isFormSubmitted = false;
    this.isUserRegiter = this.loggedServices.isRegisterUserObservable;
    this.documentIsValid = false;



    this.authServices.dropdownInfo().subscribe((result) => {

      // console.log(result)

      this.locations = result.locations;
      this.preventions_types = result.preventions_types;
      this.property_types = result.property_types;
      this.reasonOptions = result.motives;
      this.dedicationOptions = result.dedications;
      this.remunerationOptions = result.remunerations;


      result.preventions_types_details.map((res: any) => {
        if (res.id_prevention_type === 1) {
          this.preventions_types_details.push(res);
        } else if (res.id_prevention_type === 2) {
          this.preventions_types_details2.push(res);

        } else if (res.id_prevention_type === 3) {
          this.preventions_types_details3.push(res);

        }
        else {
          this.preventions_types_details4.push(res);
        }
      });


    }, error => {

    },
    () =>{

    })



    let password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]);

    this.userRegister= this.fb.group({
      names: ['',[Validators.required, Validators.pattern(/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/)]],
      lastNames: ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/)]],
      datesBirth: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.minLength(9)]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9)]],
      isCaretaker: ['', [ Validators.required]],
      reason: ['', []],
      dedication: ['', []],
      remuneration: ['', []],


      address: this.fb.group({
        locations: ['', Validators.required],
        numberStreet: ['', [ Validators.required ]],
        property_types: ['', Validators.required],
        nameHome: ['', [ Validators.required ]],
      }),

      healthInformation: this.fb.group({
        preventions_types: ['', Validators.required],
        preventions_types_details: [''],
        haveInsurance: ['', Validators.required]
      }),

      documents: this.fb.array([]),
      documents2: this.fb.array([]),

      accesData: this.fb.group({
        password: password,
        rePassword: ['', [Validators.required, CustomValidators.equalTo(password)]],
      }),
      authCheck: ['',[Validators.required]]
    })

    this.addDocument();

    this.addDocument2();

    // console.log(this.userRegister);





  }

  get documents() {
    return this.userRegister.controls["documents"] as FormArray;
  }
  get documents2() {
    return this.userRegister.controls["documents2"] as FormArray;
  }


  addDocument() {
    const documentForm = this.fb.group({
      document_path: ['', Validators.required],
    });

    this.documents.push(documentForm);
  }

  addDocument2() {
    const documentForm = this.fb.group({
      document_path: ['', Validators.required],
    });

    this.documents2.push(documentForm);
  }

  deleteDocument(DocumentIndex: number) {
    this.documents.removeAt(DocumentIndex);
  }

  deleteDocument2(DocumentIndex: number) {
    this.documents2.removeAt(DocumentIndex);
  }


  modalValidateEmail(email: any, rutUser: any) {
    this.modalService.openModalData2(ValidateEmailComponent, email, rutUser);
  }

  onRegister(e: Event) {
    e.preventDefault();

    let selectedpreventions_types_details: any = "";

    if (this.userRegister.controls.healthInformation.value.preventions_types == 3 ) {
      selectedpreventions_types_details = 12;
    } else if (this.userRegister.controls.healthInformation.value.preventions_types == 4) {
      selectedpreventions_types_details = 13;
    }
     else {
      selectedpreventions_types_details = this.userRegister.controls.healthInformation.value.preventions_types_details
    }

    const dataUser = {
      rut : this.rut,
      names: this.userRegister.value.names,
      lastname: this.userRegister.value.lastNames,
      f_nac: this.userRegister.value.datesBirth,
      email: this.userRegister.value.email,
      landline: this.userRegister.value.landLine,

      carer: this.userRegister.value.isCaretaker,
      id_motive: this.userRegister.value.reason,
      id_dedication: this.userRegister.value.dedication,
      id_remuneration: this.userRegister.value.remuneration,

      mobile_phone: this.userRegister.value.mobilePhone,
      password: this.userRegister.controls.accesData.value.password,

      id_location: this.userRegister.controls.address.value.locations,
      way_number: this.userRegister.controls.address.value.numberStreet,
      id_property_type: this.userRegister.controls.address.value.property_types,
      property_number: this.userRegister.controls.address.value.nameHome,
      id_prevention_type_detail : selectedpreventions_types_details,
      assurance: this.userRegister.controls.healthInformation.value.haveInsurance,

      terms_condition: this.userRegister.value.authCheck,

      id_status: 1,
      applicant_at_home: false,
      prevention_is_valid: false,
      location_is_valid: false,
      comments: null,
      is_active: false,
      rut_match: false,
      aps: false

    }

    console.log(dataUser)

    this.isFormSubmitted = true;

    if ((this.userRegister.status == "VALID" && this.userRegister.controls.authCheck.value == true && selectedpreventions_types_details != "")) {


      this.authServices.register(dataUser).subscribe(result => {

      },
      error => {
        this.errors=error;

        if( this.errors == '{"email":["The email has already been taken."]}'){
          let title= "";
          let message = "El correo electrónico que introdujo ya se encuentra asociado a otro usuario. Por favor verifique e intente nuevamente";
          this.modalService.OpenModalError2(ModalComponent, true, title, message);
        }

      },
      () => {

        this.uploadFiles();

      });
    }


  }


  selectdataFile(event: any, index: any, id_document_type: any): void {
    this.file = <File>event.target.files[0];
    this.documentIsValid = true;


    if ( this.file != undefined ) {

      if ( this.file.type == "image/jpeg" || this.file.type == "application/pdf" || this.file.type == "image/png") {


        this.selectFiles.push({'fileData': this.file, 'id_document_type': id_document_type});
        console.log(this.selectFiles);

        this.documentIsValid = false;

      } else {

        this.documentIsValid = false;

        if (id_document_type == 1) {

          this.deleteDocument(index);
          this.addDocument();
          this.documentIsValid = false;


        } else {

          this.deleteDocument2(index);
          this.addDocument2();
          this.documentIsValid = false;

        }

      }

    } else {

      // console.log(this.selectFiles);
      this.deleteDocument(index);
      this.addDocument();

      this.deleteDocument2(index);
      this.addDocument2();

      this.selectFiles =[]
      // console.log(this.selectFiles);
      this.documentIsValid = false;

    }



  }


  uploadFiles() {

    this.selectFiles.map((file) => {

      let fileData = file.fileData;
      let id_document_type = file.id_document_type

      this.authServices.uploadFiles(fileData, id_document_type).subscribe((res) =>
         {
            console.log(res);
          },
          error => {

          },
          () => {

          })
        })

        this.loggedServices.changeisRegisterUserStatus = true;
        this.isFormSubmitted = false;
        this.emailUser = this.userRegister.value.email;
        this.modalValidateEmail(this.emailUser, this.rut);

        let title= "";
          let message = "Su correo electrónico y número celular, nos permitirán mantener contacto con usted e informar nuevos beneficios, oportunidades y descuentos. Recuerde que la información que está enviando será verificada por el Municipio. En caso de verificar que la información entregada es falsa, su solicitud de ingreso al programa quedará cancelada de forma permanente";
          this.modalService.OpenModalError2(ModalComponent, "alert", title, message);

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
