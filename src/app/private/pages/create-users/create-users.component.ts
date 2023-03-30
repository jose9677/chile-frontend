import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { AuthService } from 'src/app/public/auth/shared/services/auth.service';
import { PrivateService } from '../../share/services/private.service';
import { UserCreatedComponent } from '../modales/user-created/user-created.component';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUsersComponent implements OnInit {

  public errors: any = null;

  public buttonBlock:boolean

  public id:any = sessionStorage.getItem("rol-user") ;

  public rut:any = sessionStorage.getItem("auth-user")

  public nuevoRut:any

  public editable:boolean

  public isFormSubmitted: boolean;

  public userRegister: any;

  public selectedStreet: any = null;

  public selectedStreet1: any = null;

  public selectedSupervisorStreet: any = null;

  public RolOfstreet: any[]= [];

  public supervisorOfstreet: any[]= [];

  public digitoVerificador: any[]= [];

  public file: File;

  public documentIsValid: boolean;

  public selectFiles: any[];

  public genderOptions: any[];

  public selectedGenderOption: any = null;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalsService,
    private authServices: AuthService,
    private privateService:PrivateService,
    private routerQuery: ActivatedRoute,
    // public modalService3: NgbActiveModal, da ERROR y la pantalla se vuelve loca
    private modalService2: ModalsService,
  ) {

    this.genderOptions = [];

    this.selectFiles =[];

    this.isFormSubmitted = false;


  }

  ngOnInit(): void {

    this.authServices.dropdownInfo().subscribe((result) => {

      this.genderOptions = result.sex;


    }, error => {

    },
    () =>{

    })

    this.privateService.roles().subscribe(dataRequest => {
      let array: any[]= []
      for (let i=0; i<dataRequest.length; i++){
        if (this.id==3){
          if (dataRequest[i].id==2){
            array.push(dataRequest[i])
          }
        }else if(this.id==4){
          if(dataRequest[i].id==2 || dataRequest[i].id==3 ||dataRequest[i].id==4){
            array.push(dataRequest[i])
          }
        }else if (this.id=5){
          if(dataRequest[i].id==1 ||dataRequest[i].id==2 || dataRequest[i].id==3 || dataRequest[i].id==4){
            array.push(dataRequest[i])
          }
        }
      }
      this.RolOfstreet=array
    })

    this.privateService.supervisor().subscribe(dataRequest => {
      this.supervisorOfstreet=dataRequest
      for (let i=0; i<dataRequest.length; i++){
        this.supervisorOfstreet[i].names +=" "+dataRequest[i].lastname
      }
    })

    if(this.id==3){
      this.editable=true
      this.nuevoRut=""
      for(let i=0; i<this.rut.length;i++){
        if (this.rut[i]!='"'){
          this.nuevoRut+=this.rut[i]
        }
      }
    }


    this.userRegister= this.fb.group({
      names: ['',[Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
      // rutUser: ['',[Validators.required,Validators.pattern(/^[0-9]{6,8}$/)]],
      rutUser: ['',[Validators.required]],
      lastNames: ['', [Validators.required,Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/) ]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
      gender: ['', [ Validators.required ]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      RolOfstreet: ['', Validators.required],
      supervisorOfstreet:['', Validators.required],
      documents: this.fb.array([]),

    })



    this.addDocument();



  }
  get documents() {
    return this.userRegister.controls["documents"] as FormArray;
  }
  addDocument() {
    const documentForm = this.fb.group({
        document_path: ['', Validators.required],
    });

    this.documents.push(documentForm);
  }
  deleteDocument(DocumentIndex: number) {
    this.documents.removeAt(DocumentIndex);
  }
  onRegister(e: Event){

    e.preventDefault;

    const dataUser ={
      rut:(this.userRegister.value.rutUser).toUpperCase(),
      names:this.userRegister.value.names,
      lastname:this.userRegister.value.lastNames,
      f_nac:this.userRegister.value.datesBirth,
      id_sex: this.userRegister.value.gender,
      email:this.userRegister.value.email,
      landline:this.userRegister.value.landLine,
      mobile_phone:this.userRegister.value.mobilePhone,
      supervisor_rut:this.userRegister.value.supervisorOfstreet,
      // profile_pic:this.userRegister.value.documents[0].document_path,
      // profile_pic:this.userRegister.value.documents,
      // supervisorofstreet:this.userRegister.value.supervisorOfstreet,
      id_rol:this.userRegister.value.RolOfstreet
    }

    this.privateService.register(dataUser).subscribe(result => {
      // this.uploadFiles();
      // e.preventDefault();
     this.modalService.openModal(UserCreatedComponent)
      this.isFormSubmitted = false;
    },
    error => {
      this.errors=error;
      if( this.errors == '{"email":["The email has already been taken."]}'){
        let title= "";
        let message = "El correo electrónico que introdujo ya se encuentra asociado a otro usuario. Por favor verifique e intente nuevamente";
        this.modalService.OpenModalError2(ModalComponent, true, title, message);
      }else{
        let title= "";
        let message = "sucedió un Error verifique en el formulario que ingreso todos los campos correctamente";
        this.modalService2.OpenModalError2(ModalComponent, true, title, message);
      }
      this.buttonBlock=false
      this.isFormSubmitted = true;

    },
    () => {
      this.uploadFiles( dataUser.rut );
    });

  }


  uploadFiles(dataRutUser: any) {

    let rutUser = dataRutUser

    this.selectFiles.map((file) => {

      let fileData = file.profile_pic;


      this.privateService.uploadFiles(fileData, rutUser).subscribe((res) =>
         {
          },
          error => {

          },
          () => {

          })
        })
        this.isFormSubmitted = false;
  }


  selectdataFile(event: any, index: any, id_document_type: any): void {
    this.file = <File>event.target.files[0];
    this.documentIsValid = true;


    if ( this.file != undefined ) {

      if ( this.file.type == "image/jpeg" || this.file.type == "application/pdf" || this.file.type == "image/png") {


        this.selectFiles.push({'profile_pic': this.file, 'id_document_type': id_document_type});

        this.documentIsValid = false;

      } else {

        this.documentIsValid = false;

        if (id_document_type == 3) {

          this.deleteDocument(index);
          this.addDocument();
          this.documentIsValid = false;


        }

      }

    } else {

      this.deleteDocument(index);
      this.addDocument();

      this.selectFiles =[]
      this.documentIsValid = false;

    }
  }

  confirmRut(e: Event){
    if(this.userRegister.controls.names.errors || this.userRegister.controls.rutUser.errors  || this.userRegister.controls.lastNames.errors  || this.userRegister.controls.datesBirth.errors  || this.userRegister.controls.email.errors  || this.userRegister.controls.landLine.errors  || this.userRegister.controls.mobilePhone.errors  || this.userRegister.controls.RolOfstreet.errors  || (this.userRegister.controls.supervisorOfstreet.errors && this.userRegister.controls.RolOfstreet.value ==2) ){
      this.isFormSubmitted = true;
      let title= "";
      let message = "sucedió un Error verifique en el formulario que ingreso todos los campos correctamente";
      this.modalService2.OpenModalError2(ModalComponent, true, title, message);
    }else{
      this.buttonBlock=true
      const dataRutUser= {
        rut: (this.userRegister.value.rutUser).toUpperCase()
      }

      this.authServices.validateRut(dataRutUser).subscribe( result => {
      },
      error => {  //recibe error del user services
        this.errors= true;

        if (error.error == 'User exists in DB'){
          this.errors= true;
          let title: string = "Usuario Registrado"
          let message = "El Rut ingresado ya esta registrado, por favor verifique y vuelva a intentarlo";
          this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);
        }else{
          let title: string = "RUT Invalido"
          let message = "El Rut ingresado es invalido, por favor verifique y vuelva a intentarlo";
          this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);
          this.buttonBlock=false
        }

      },
      () => {
        this.onRegister(e)
        // this.modalService3.close()
        // this.router.navigate(['/seguridad/Crear-usuario'], { queryParams: { rut: this.userRegister.value.rutUser } });


      });
    }
  }

  correctRut(): any {

    if ((this.userRegister.value.rutUser != '')) {

      let rut = this.userRegister.value.rutUser;

      rut = rut.replace(/\-/g, "");
      rut = rut.replace(/\.|,/g, "");

      let code = rut.slice(-1);

      let correctRut = rut.slice(0, -1) + "-" + code;

      this.userRegister.controls['rutUser'].setValue(correctRut);


    }

  }
}
