import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthService } from 'src/app/public/auth/shared/services/auth.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { PrivateService } from '../../share/services/private.service';
import { ActivatedRoute,Router } from '@angular/router';
import { UserUpdateComponent } from '../modales/user-update/user-update.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  public errors: any = null;
  public buttonBlock:boolean;
  private id:any = sessionStorage.getItem("rol-user") ;
  private rut:any = sessionStorage.getItem("auth-user") ;
  public nuevoRut:any
  private ruts:any;
  public editable:boolean=false;
  public isFormSubmitted: boolean;
  public userRegister: any;
  public usuario: any[]= [];
  public selectFiles: any[];
  public file: File;
  public documentIsValid: boolean;
  public selectedStreet: any = null;
  public RolOfstreet: any[]= [];
  public supervisorOfstreet: any[]= [];
  public selectedSupervisorStreet: any = null;

  public changePickProfile: boolean;

  public picProfile: any;

  private supervisorRut: any;

  private subscription: Subscription;



  constructor(
   private privateService:PrivateService,
   private fb: FormBuilder,
   private authServices: AuthService,
   private modalService2: ModalsService,
   private router: Router,
   private activatedroute: ActivatedRoute,
   private ref: ChangeDetectorRef
  ) {

    this.picProfile = '';

    this.changePickProfile = false;

    this.supervisorRut= '';

    this.selectFiles = [];
    this.activatedroute.params.subscribe(params=>{
        this.ruts=params['id']
    })
    this.privateService.roles().subscribe(dataRequest => {
      let array: any[]= []

      if(this.id==5){
        this.RolOfstreet=dataRequest;
        this.RolOfstreet.splice(0, 1)

      }else{
        for (let i=1; i<dataRequest.length; i++){
          array.push(dataRequest[i])
        }
        this.RolOfstreet=array
      }
    })
    this.privateService.supervisor().subscribe(dataRequest => {
      this.supervisorOfstreet=dataRequest
      for (let i=0; i<dataRequest.length; i++){
        this.supervisorOfstreet[i].names +=" "+dataRequest[i].lastname
      }
    })
  }

  ngOnInit(): void {
    this.nuevoRut=""
      for(let i=0; i<this.rut.length;i++){
        if (this.rut[i]!='"'){
          this.nuevoRut+=this.rut[i]
        }
      }
    if (this.id == 3){
      this.editable=true
    }

    this.getDataUser();

    this.isFormSubmitted = false;

    this.userRegister= this.fb.group({
      rutUser: ['',[Validators.required]],
      names: ['',[Validators.required,Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/) ]],
      lastNames: ['', [Validators.required,Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/) ]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      idRole: ['', Validators.required],
      supervisorOfstreet:['', Validators.required],
      documents: this.fb.array([]),

    })

    this.addDocument();

    this.subscription = this.privateService.refresh$.subscribe( () => {
      this.getDataUser();
    })


  }

  getDataUser(): void {

    let picProfile = '';

    this.privateService.datosUser(this.ruts).subscribe(dataRequest => {


      this.userRegister.get('rutUser').setValue(dataRequest[0].rut),
      this.userRegister.get('names').setValue(dataRequest[0].names),
      this.userRegister.get('lastNames').setValue(dataRequest[0].lastname),
      this.userRegister.get('datesBirth').setValue(dataRequest[0].f_nac),
      this.userRegister.get('email').setValue(dataRequest[0].email),
      this.userRegister.get('landLine').setValue(dataRequest[0].landline),
      this.userRegister.get('mobilePhone').setValue(dataRequest[0].mobile_phone),
      this.userRegister.get('idRole').setValue(dataRequest[0].id_rol),
      this.userRegister.get('supervisorOfstreet').setValue(dataRequest[0].supervisor_rut),

      dataRequest.map((res: any) => {
        picProfile = res.profile_pic_srv_path
        this.picProfile = picProfile;
      })


    })


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

  uploadFiles( dataRutUser: any) {

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
    this.changePickProfile = true;



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

  updateEmployee(e: Event) {
    const dataUser ={
      "rut" : this.userRegister.value.rutUser,
      "names": this.userRegister.value.names,
      "lastname": this.userRegister.value.lastNames,
      "f_nac": this.userRegister.value.datesBirth,
      "email": this.userRegister.value.email,
      "landline": this.userRegister.value.landLine,
      "mobile_phone": this.userRegister.value.mobilePhone,
      "id_rol" : this.userRegister.value.idRole

    }

    this.privateService.actualizarUser(dataUser,this.nuevoRut).subscribe(result => {

    },
    error => {

    },
    () => {
      if (( this.picProfile != '' || this.changePickProfile == true)) {

        this.uploadFiles(dataUser.rut);
      }

      if ( (dataUser.rut == 2) && (this.supervisorRut != this.userRegister.value.supervisorOfstreet )) {

        this.addSupervisor( this.userRegister.value.rutUser, this.userRegister.value.supervisorOfstreet  );

      } else {
        this.addSupervisor( this.userRegister.value.rutUser, '');
      }

      this.changePickProfile= false;


    })

  }

  undoProfilePicChange(DocumentIndex: any): void {
    this.deleteDocument(DocumentIndex);
    this.addDocument();
    this.selectFiles =[];
    this.changePickProfile= false;

  }

  addSupervisor(rutUser: any, rutSupervisor: any) {

    const dataUser = {
      'rut': rutSupervisor
    }

    this.privateService.addSupervisor( rutUser, dataUser).subscribe(result => {
    },
    error => {

    },
    () => {
    })

  }

}
