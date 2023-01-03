import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { AuthService } from 'src/app/public/auth/shared/services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateService } from '../../share/services/private.service';




@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUsersComponent implements OnInit {

  public errors: any = null;

  public isFormSubmitted: boolean;

  public userRegister: any;

  public selectedStreet: any = null;

  public selectedSupervisorStreet: any = null;

  public RolOfstreet: any[]= [];

  public supervisorOfstreet: any[]= [];

  public file: File;

  public documentIsValid: boolean;

  public selectFiles: any[];


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
    this.privateService.roles().subscribe(dataRequest => {
      console.log(dataRequest)
      let array: any[]= []
      for (let i=1; i<dataRequest.length; i++){
        array.push(dataRequest[i])
      }
      this.RolOfstreet=array
      console.log(this.RolOfstreet)
    })
    this.privateService.supervisor().subscribe(dataRequest => {
      console.log(dataRequest)
      this.supervisorOfstreet=dataRequest
    })
    // this.supervisorOfstreet =[
    //   {
    //     'id':1,
    //     'name':'pedro'
    //   },
    //   {
    //     'id':2,
    //     'name':'juan'
    //   }
    // ]
  }

  ngOnInit(): void {

    this.isFormSubmitted = false;

    this.userRegister= this.fb.group({
      names: ['',[Validators.required, ]],
      rutUser: ['',[Validators.required]],
      lastNames: ['', [Validators.required, ]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      RolOfstreet: ['', Validators.required],
      supervisorOfstreet:['', Validators.required],
      documents: this.fb.array([]),

    })

    // this.privateService.roles().subscribe(dataRequest => {

    //   console.log(dataRequest)
    //   for (let i=0;i<dataRequest.length; i++){
    //     this.RolOfstreet.push(dataRequest[i]);
    //   }
    //   console.log(this.RolOfstreet[0])



    // })

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
    console.log(this.userRegister);
    const dataUser ={
      rut:this.userRegister.value.rutUser,
      names:this.userRegister.value.names,
      lastname:this.userRegister.value.lastNames,
      f_nac:this.userRegister.value.datesBirth,
      email:this.userRegister.value.email,
      landline:this.userRegister.value.landLine,
      mobile_phone:this.userRegister.value.mobilePhone,
      supervisor_rut:this.userRegister.value.supervisorOfstreet,
      profile_pic:'xxx',
      // supervisorofstreet:this.userRegister.value.supervisorOfstreet,
      id_rol:this.userRegister.value.RolOfstreet
    }
    console.log(dataUser);
    this.privateService.register(dataUser).subscribe(result => {
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
      this.uploadFiles();
      e.preventDefault();
      this.router.navigate(['privado/ver-usuarios']);
      this.isFormSubmitted = false;

    });
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
        this.isFormSubmitted = false;
  }


  selectdataFile(event: any, index: any, id_document_type: any): void {
    this.file = <File>event.target.files[0];
    // console.log(this.file);
    this.documentIsValid = true;

    console.log(this.file)

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


        }

      }

    } else {

      console.log(this.selectFiles);
      this.deleteDocument(index);
      this.addDocument();

      this.selectFiles =[]
      console.log(this.selectFiles);
      this.documentIsValid = false;

    }



  }
  confirmRut(e: Event){
    if(this.userRegister.controls.names.errors || this.userRegister.controls.rutUser.errors  || this.userRegister.controls.lastNames.errors  || this.userRegister.controls.datesBirth.errors  || this.userRegister.controls.email.errors  || this.userRegister.controls.landLine.errors  || this.userRegister.controls.mobilePhone.errors  || this.userRegister.controls.RolOfstreet.errors  || (this.userRegister.controls.supervisorOfstreet.errors && this.userRegister.controls.RolOfstreet.value ==2)  || this.userRegister.controls.documents.errors ){
      this.isFormSubmitted = true;
    }else{
      const dataRutUser= {
        rut: this.userRegister.value.rutUser
      }

      this.authServices.validateRut(dataRutUser).subscribe( result => {
        console.log(result)
      },
      error => {  //recibe error del user services
        this.errors= true;
        let title: string = "Rut Incorrecto"
        let message = "El Rut ingresado no es correcto, por favor verifique y vuelva a intentarlo";
        this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);


      },
      () => {
        this.onRegister(e)
        // this.modalService3.close()
        // this.router.navigate(['/privado/Crear-usuario'], { queryParams: { rut: this.userRegister.value.rutUser } });


      });
    }
  }
}
