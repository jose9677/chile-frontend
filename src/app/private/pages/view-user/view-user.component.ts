import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthService } from 'src/app/public/auth/shared/services/auth.service';
import { PrivateService } from '../../share/services/private.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  public errors: any = null;
  public buttonBlock:boolean;
  private id:any = sessionStorage.getItem("rol-user") ;
  private rut:any = sessionStorage.getItem("auth-user") ;
  public nuevoRut:any
  private ruts:any;
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
  constructor(
    private privateService:PrivateService,
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.activatedroute.params.subscribe(params=>{
      this.ruts=params['id']
  })
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
   }

  ngOnInit(): void {
    this.nuevoRut=""
    for(let i=0; i<this.rut.length;i++){
      if (this.rut[i]!='"'){
        this.nuevoRut+=this.rut[i]
      }
    }
    console.log(this.id);
    this.privateService.datosUser(this.ruts).subscribe(dataRequest => {
      this.usuario.push(dataRequest[0])
    })
    this.isFormSubmitted = false;

    this.userRegister= this.fb.group({
      names: ['',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/) ]],
      rutUser: ['',[Validators.required]],
      lastNames: ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/) ]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
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

}
