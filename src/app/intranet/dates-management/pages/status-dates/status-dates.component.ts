import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DatesService } from '../../shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { VisitorDataComponent } from '../visitor-data/visitor-data.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import {default as mockDataRequestForId} from '../../mocks/dataRequesForId.json'
import {default as mockDataForm} from '../../mocks/dataSelectForm.json'
import {default as changesData} from '../../mocks/changesData.json'
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { EvaluateChangesService } from '../../shared/services/evaluate-changes.service';

@Component({
  selector: 'app-status-dates',
  templateUrl: './status-dates.component.html',
  styleUrls: ['./status-dates.component.scss']
})
export class StatusDatesComponent implements OnInit {

  private subscription: Subscription;
  private approvalSubscription: Subscription;


  public isEditingPersonalData: Observable<boolean>;
  public isEditingRequestData: Observable<boolean>;
  public isEditingDocuments: Observable<boolean>;
  public isEditingAdditionalInformation: Observable<boolean>;

  public isFormSubmitted: boolean;
  public documentIsValid: boolean;

  public today: any;

  public errors: any = null;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  public unassignedRequest: any[];

  public documentsPre: any[];

  public documentsDom: any[];

  public genders: any[];

  public locations: any[];

  public propertyTypes: any[];

  public preventionsTypes: any[];

  public preventionTypeRequest: any;

  public dataPreventionDetails: any[];

  public preventionDetails: any[];

  public preventionDetailRequest: any;

  public remunerationsTypes: any[];

  public motives: any[];

  public dedicationsTypes: any[];

  public typeProperty: any;

  public fullAddress: any;

  public dataRequest: any[];

  public listDocumentsDelete: any[];

  private listFilesUpload : any[];

  public statusRequest: any;

  public listStatus: any[];


  public rutEmployee: any;

  public modifiedData: any = [];
  public originalData: any = [];

  public editingStatus: any = ['1','2'];

  // public acceptChange: any = false;

  // viewChanges(statusChange) {
  //   this.modifiedData.user_data[0].modifiedNames = !statusChange;
  // }

  // approvedChanges(statusChange) {
  //   this.modifiedData.user_data[0].approvedChangeNames = true;

  //   this.updateRequestForm.controls.names.setValue(statusChange);
  // }

  // rejectedChanges() {
  //   this.modifiedData.user_data[0].approvedChangeNames = false;
  //   this.updateRequestForm.controls.names.setValue(this.dataRequest[0].names);
  // }

  public updateRequestForm: any = this.fb.group({
    rut: ['', []],
    names: ['',[Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
    lastNames: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
    gender: ['', [ Validators.required]],
    datesBirth: ['', [Validators.required]],
    email: ['', [Validators.required, CustomValidators.email]],
    landLine: ['', [Validators.minLength(9)]],
    mobilePhone: ['', [Validators.required, Validators.minLength(9)]],

    requestNumber: ['', []],
    dateRequest: ['', []],
    statusRequest: ['', [Validators.required]],
    preventionsTypes: ['', [Validators.required]],
    preventionsTypesDetails: ['', [Validators.required]],
    haveInsurance: ['', [Validators.required]],
    directionToUse: ['', [Validators.required]],
    addressRegisteredToPage: this.fb.array([]),
    addressWots: this.fb.array([]),

    documents: this.fb.array([]),
    documents2: this.fb.array([]),

    isCaretaker: ['', [Validators.required]],
    dataCaretaker: this.fb.array([]),
    registeredInAPS: ['', []],
    discountPercentage: ['', []],
    dataOrigin: ['', []],
    comments: ['', []]
  });

  constructor(
    private routerQuery: ActivatedRoute,
    private router: Router,
    private dateService: DatesService,
    private evaluateChangesServices: EvaluateChangesService,
    private modalService: ModalsService,
    private fb: FormBuilder

  ) {

    this.rutEmployee = JSON.parse(window.sessionStorage.getItem('auth-user'));

    console.log(this.rutEmployee);

    this.today = new Date()
      this.today = `${this.today.getFullYear()}-${(this.today.getMonth())+1}-${this.today.getDate()}`

    this.isEditingPersonalData = this.evaluateChangesServices.editingPersonalDataObservable;
    this.isEditingRequestData = this.evaluateChangesServices.EditingRequestDataObservable;
    this.isEditingDocuments = this.evaluateChangesServices.EditingDocumentsObservable
    this.isEditingAdditionalInformation = this.evaluateChangesServices.EditingAdditionalInformationObservable;

    this.isFormSubmitted = false;
    this.documentIsValid = false;

    this.documentsDom = [];

    this.documentsPre = [];

    this.listDocumentsDelete = [];

    this.preventionDetails = [];

    this.unassignedRequest = [];

    this.dataRequest = [];

    this.listFilesUpload = [];


  }

  ngOnInit(): void {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);



    this.subscription = this.dateService.refresh$.subscribe( () => {
      // this.getDataRequestForId();
      this.dataSelectForm();
    })

    this.approvalSubscription = this.evaluateChangesServices.refresh$.subscribe( () => {
      console.log('approval')

      this.getDataUserModified();
      this.getDataRequestForId();

      // this.dataSelectForm();
    })

    this.dataSelectForm();

    this.willBeDeleted();

    this.getDataUserModified();
  }


  fillOptionsSelectForm(dataOptions) {

    const {gender, locations, property_types, prevention_types, prevention_details, remunerations, motives, dedications } = dataOptions[0]

    this.genders = gender;
    this.locations = locations;
    this.propertyTypes = property_types;
    this.preventionsTypes = prevention_types;
    this.preventionDetails = prevention_details;
    this.remunerationsTypes = remunerations;
    this.motives = motives;
    this.dedicationsTypes = dedications;

  }

  get directionRegisteredOnThePageArray() {
    return this.updateRequestForm.controls['addressRegisteredToPage'] as FormArray
  }


  addDirectionRegisteredOnThePageForm() {
    let validatorRegisterToPage = this.updateRequestForm.value.directionToUse !== 'wots' ? [Validators.required] : [];

    const dataForm = this.fb.group({
      location: ['', validatorRegisterToPage],
      numberStreet: ['', validatorRegisterToPage],
      propertyType: ['', validatorRegisterToPage],
      nameHome: ['', validatorRegisterToPage]
    })
    // this.updateRequestForm.controls.directionToUse.setValue(1);
    this.directionRegisteredOnThePageArray.push(dataForm);
  }

  deleteDirectionRegisteredOnThePageForm() {

    this.directionRegisteredOnThePageArray.clear();
  }

  get addressWotsArray() {
    return this.updateRequestForm.controls['addressWots'] as FormArray
  }

  addAddressWots() {
    let validatorWots = this.updateRequestForm.value.directionToUse === 'wots' ? [Validators.required] : [];

    const dataForm = this.fb.group({
      addressWots: ['', validatorWots]
    })
    // this.updateRequestForm.controls.directionToUse.setValue('wots');

    this.addressWotsArray.push(dataForm);
  }

  deleteAddressWots() {

    this.addressWotsArray.clear();
  }

  statusOriginAddress() {

    if (this.updateRequestForm.value.addressWots.length === 0) {
      this.addAddressWots();
    };

    if (this.updateRequestForm.value.addressRegisteredToPage.length === 0) {
      this.addDirectionRegisteredOnThePageForm();
    };

  }

  changeOriginAddress( e: any ) {

    e.preventDefault;

    // this.statusOriginAddress(e);
    const f = this.updateRequestForm.controls.addressRegisteredToPage.controls[0]?.controls;
    const fw = this.updateRequestForm.controls.addressWots.controls[0]?.controls;

    const { idLocation, wayNumber, idPropertyType, propertyNumber, addressWots} = this.dataRequest[0];

    f.location.setValue(idLocation);
    f.numberStreet.setValue(wayNumber);
    f.propertyType.setValue(idPropertyType);
    f.nameHome.setValue(propertyNumber);

    fw.addressWots.setValue(addressWots)
  }


  get dataCaretakerArray() {
    return this.updateRequestForm.controls['dataCaretaker'] as FormArray
  }

  addDateCaretaker() {
    const dataForm = this.fb.group({
      reason: ['', [Validators.required]],
      dedicationsTypes: ['', [Validators.required]],
      remunerationType: ['', [Validators.required]]
    })
    this.dataCaretakerArray.push(dataForm);
  }

  deleteDataCaretaker() {

    this.dataCaretakerArray.clear();
  }

  statusCaretaker( status: any ) {

    if (status) {

      if (this.updateRequestForm.value.dataCaretaker.length === 0) this.addDateCaretaker();

      if(this.dataRequest.length !== 0){
      }
      const f = this.updateRequestForm.controls;
      const {motive, dedication, remuneration, comments} = this.dataRequest[0];

      f.dataCaretaker.controls[0]?.controls.reason.setValue(motive);
      f.dataCaretaker.controls[0]?.controls.dedicationsTypes.setValue(dedication);
      f.dataCaretaker.controls[0]?.controls.remunerationType.setValue(remuneration);
      f.comments.setValue(comments);

      return
    }

    return this.deleteDataCaretaker();

  }

  get dataDocumentsArray() {
    return this.updateRequestForm.controls['documents'] as FormArray
  }

  addDocument() {
    const dataForm = this.fb.group({
      document: ['', Validators.required]
    })
    // this.updateRequestForm.controls.directionToUse.setValue('wots');

    this.dataDocumentsArray.push(dataForm);
  }

  deleteDocument( DocumentIndex: any ) {

    this.dataDocumentsArray.removeAt(DocumentIndex);

  }

  get dataDocuments2Array() {
    return this.updateRequestForm.controls['documents2'] as FormArray
  }

  addDocument2() {
    const dataForm = this.fb.group({
      document: ['', Validators.required]
    })
    // this.updateRequestForm.controls.directionToUse.setValue('wots');

    this.dataDocuments2Array.push(dataForm);
  }

  deleteDocument2( DocumentIndex: any ) {

    this.dataDocuments2Array.removeAt(DocumentIndex);

  }

  selectdataFile(event: any, index: any, id_document_type: any): void {

    const file = <File>event.target.files[0];

  this.documentIsValid = true;


  if ( file != undefined ) {

    if ( file.type == "image/jpeg" || file.type == "application/pdf" || file.type == "image/png") {


      this.listFilesUpload.push({'fileData': file, 'id_document_type': id_document_type});

      this.documentIsValid = true;

    }

  } else {

    this.deleteDocument(index);
    this.addDocument();

    this.deleteDocument2(index);
    this.addDocument2();

    this.listFilesUpload =[];
    this.documentIsValid = false;
  }


  }


  fillForm(dataRequest: any) {

    let data : any [] = [];
    data = dataRequest;

    data.map((res: any)=>{
      const {rut, names, lastNames, gender, datesBirth, email, landLine, mobilePhone, haveInsurance,idRequest, dateRequest, statusRequest, preventionsTypes, preventionsTypesDetails, originDirection, idLocation, wayNumber,idPropertyType, propertyNumber, addressWots, isCaretaker, motive, dedication, remuneration, registeredInAPS, discountPercentage, dataOrigin, comments, documents } = res;

      const f = this.updateRequestForm.controls;

      if(!this.evaluateChangesServices.viewEditingPersonalData()) {
        f.rut.setValue(rut);
        f.names.setValue(names);
        f.lastNames.setValue(lastNames);
        f.gender.setValue(gender)
        f.datesBirth.setValue(datesBirth);
        f.email.setValue(email);
        f.landLine.setValue(landLine);
        f.mobilePhone.setValue(mobilePhone);
      }

      if(!this.evaluateChangesServices.viewEditingRequestData()) {

        f.haveInsurance.setValue(haveInsurance);

        f.requestNumber.setValue(idRequest);

        f.dateRequest.setValue(dateRequest);

        // this.statusRequest = this.status.find(({id}) => id === Number(statusRequest))
        // this.statusRequest = this.statusRequest.status;

        f.statusRequest.setValue(statusRequest);

        f.preventionsTypes.setValue(preventionsTypes);

        this.changePrevision(preventionsTypes);

        this.preventionTypeRequest =  this.preventionsTypes.find(({id}) => id === Number(this.updateRequestForm.value.preventionsTypes));

        this.preventionTypeRequest = this.preventionTypeRequest.prevention_type;

        f.preventionsTypesDetails.setValue(preventionsTypesDetails);

        this.preventionDetailRequest = this.preventionDetails.find(({id})=> id === Number( this.updateRequestForm.value.preventionsTypesDetails));

        this.preventionDetailRequest = this.preventionDetailRequest.prevention_detail;

        f.directionToUse?.setValue(originDirection.toUpperCase());

        this.statusOriginAddress();

        f.addressWots.controls[0]?.controls.addressWots.setValue(addressWots);

        f.addressRegisteredToPage.controls[0]?.controls.location.setValue(idLocation);
        f.addressRegisteredToPage.controls[0]?.controls.numberStreet.setValue(wayNumber);
        f.addressRegisteredToPage.controls[0]?.controls.propertyType.setValue(idPropertyType);
        f.addressRegisteredToPage.controls[0]?.controls.nameHome.setValue(propertyNumber);

        this.generateFullAddress();
      }

      if(!this.evaluateChangesServices.viewEditingDocuments()) {

        this.documentsDom = [];
        this.documentsPre = [];
        documents.map((res) => {


          if ( res.id_document_type === 1 ) {
            this.documentsDom.push({
              'doc_srv_path': res.doc_srv_path,
              'document_type': res.document_type,
              'document_path': res.document_path,
              'document_ext': res.document_ext,
              'document_id' : res.id_document
            });

          }

          if ( res.id_document_type === 2 ) {
            this.documentsPre.push({
              'doc_srv_path': res.doc_srv_path,
              'document_type': res.document_type,
              'document_path': res.document_path,
              'document_ext': res.document_ext,
              'document_id' : res.id_document
            })
          }
        })
      }

      if(!this.evaluateChangesServices.viewEditingAdditionalInformation()) {

        f.isCaretaker.setValue(isCaretaker);
        this.statusCaretaker(isCaretaker);
        f.dataCaretaker.controls[0]?.controls.reason.setValue(motive);
        f.dataCaretaker.controls[0]?.controls.dedicationsTypes.setValue(dedication);
        f.dataCaretaker.controls[0]?.controls.remunerationType.setValue(remuneration);
        f.registeredInAPS.setValue(registeredInAPS),
        f.discountPercentage.setValue(discountPercentage),
        f.dataOrigin.setValue(dataOrigin),
        f.comments.setValue(comments)

      }


    //   this.unassignedRequest.push(res);

    })

    this.statusDocuments();
  }

  changePrevision(e: Event) {

    let preventionDetails: any[] = [];

    this.dataPreventionDetails.map((detail) => {
      if (detail.id_prevention_type === e ) {

        preventionDetails.push(detail);
      }
    })

    this.updateRequestForm.controls.preventionsTypesDetails.reset();
    this.preventionDetails = preventionDetails;

  }

  locationChange() {
    let street = (this.locations.find(({id}) => id === Number(this.updateRequestForm.value.addressRegisteredToPage[0]?.location)));
    return street = street?.street;
  }

  typePropertyChange() {
    let type = this.propertyTypes.find(({id}) => id === Number(this.updateRequestForm.value.addressRegisteredToPage[0]?.propertyType))

    return this.typeProperty = type?.description;

  }

  getDataRequestForId() {

    let dataRequest: any = [];

    this.dateService.getForIdRequest(this.idRequest).subscribe((result) => {
      this.originalData = result;
      let data: any[] = [];
      data = [result];

      data.map((res: any) => {

        const { rut, names: names, lastname: lastNames, id_sex, f_nac: datesBirth, email, landline: landLine, mobile_phone: mobilePhone,  id_mod_status: statusModDataUser } = res.user_data[0]

        const { id_solicitude: id_request, request_date, id_status, id_prevention_type_detail, prevention_type: id_prevention_type, assurance, reg_type : id_origin_direction, longitude, latitude, id_location, way_number, id_property_type, property_number, dir_wots: address_wots } = res.data_sol[0];


        const { cuidador: carer, id_motive, id_dedication, id_remuneration, aps, porcentaje_descuento: percent, origen: origin, comments } = res.aditional_data[0];

        dataRequest.push({
          rut: rut,
          names: names,
          lastNames: lastNames,
          gender: id_sex,
          datesBirth: datesBirth,
          email: email,
          landLine: landLine,
          mobilePhone: mobilePhone,
          idRequest: id_request,
          dateRequest: request_date,
          statusRequest: id_status,
          preventionsTypes: id_prevention_type,
          preventionsTypesDetails: id_prevention_type_detail,
          haveInsurance: assurance,
          statusModDataUser: statusModDataUser,

          originDirection: (id_origin_direction === 'WOTS') || (id_origin_direction === 'wots') ? id_origin_direction : 'REGISTRO POR PAGINA',
          addressWots: address_wots ? address_wots : 'n/a',
          idLocation: id_location,
          wayNumber: way_number,
          idPropertyType: id_property_type,
          propertyNumber: property_number,

          documents: res.data_doc,

          isCaretaker: carer,
          motive: id_motive,
          dedication: id_dedication,
          remuneration: id_remuneration,
          registeredInAPS: aps === true ? 'Si' : 'No',
          discountPercentage: percent,
          dataOrigin: origin ? origin : 'REGISTRO POR PAGINA',
          comments: comments
        })

      });

    },
    error => {

      this.errors = true;


    },
    () => {
      this.dataRequest = [];

      this.dataRequest.push(dataRequest[0]);

      this.fillForm(dataRequest);





    });

  }

  generateFullAddress = () => {

    if (this.updateRequestForm.value.directionToUse === 'WOTS') return this.fullAddress = this.updateRequestForm.value.addressWots[0]?.addressWots;

    let street = this.locationChange();

    let typeProperty = this.typePropertyChange();

    return this.fullAddress = `${street}, ${this.updateRequestForm.value.addressRegisteredToPage[0]?.numberStreet ? this.updateRequestForm.value.addressRegisteredToPage[0]?.numberStreet : 's/n'}, ${typeProperty}, ${this.updateRequestForm.value.addressRegisteredToPage[0]?.nameHome ? this.updateRequestForm.value.addressRegisteredToPage[0].nameHome : 's/n'}`;

  };

  return() {
    this.router.navigate(['/'])

  }

  visitador(){
    this.modalService.openModalData(VisitorDataComponent, this.unassignedRequest[0]?.rut_assistant)
  }

  editPersonalData (e: Event) {
    e.preventDefault();

    this.evaluateChangesServices.changeEditingPersonalData(true);

  }

  updatePersonalData(e: Event) {
    e.preventDefault();

    const form = this.updateRequestForm.value

    this.isFormSubmitted = true;

    const personalData = {
      "rut": form.rut,
      "names": form.names,
      "lastname": form.lastNames,
      "id_sex": form.gender,
      "f_nac": form.datesBirth,
      "email": form.email,
      "landline": form.landLine,
      "mobile_phone": form.mobilePhone,
      "rut_employee": JSON.parse(sessionStorage.getItem('auth-user'))

    }

    if(this.updateRequestForm.status === 'INVALID') return;

    this.dateService.UpdatePersonalData(this.idRequest, personalData).subscribe((result) => {

    },
    error => {

      console.error(error);

      let title: string = ''
      let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
      this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      this.evaluateChangesServices.changeEditingPersonalData(false);

      let title: string = ''
      let message: string = "Los datos personales se han actualizado exitosamente";
      this.modalService.OpenModalError2(ModalComponent, false, title, message);

    })
  }

  updatePersonalDataToApprove(e: Event) {
    e.preventDefault();

    const form = this.updateRequestForm.value

    this.isFormSubmitted = true;

    const personalData = {
      "rut": form.rut,
      "names": form.names,
      "lastname": form.lastNames,
      "id_sex": form.gender,
      "f_nac": form.datesBirth,
      "email": form.email,
      "landline": form.landLine,
      "mobile_phone": form.mobilePhone,
      "rut_employee": JSON.parse(sessionStorage.getItem('auth-user'))

    }

    if(this.updateRequestForm.status === 'INVALID') return;

    this.evaluateChangesServices.createModifiedDataUser(personalData).subscribe((result) => {

    },
    error => {

      let title: string = ''
      let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
      this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      this.evaluateChangesServices.changeEditingPersonalData(false);

      let title: string = ''
      let message: string = "Los datos modificados pasaran a un proceso de evaluación";
      this.modalService.OpenModalError2(ModalComponent, false, title, message);

    })
  }

  cancelEditPersonalData (e: Event) {
    e.preventDefault();

    const {names, lastNames, datesBirth, email, gender, landLine, mobilePhone} = this.dataRequest[0];

    const f = this.updateRequestForm.controls;

    f.names.setValue(names);
    f.lastNames.setValue(lastNames);
    f.gender.setValue(gender)
    f.datesBirth.setValue(datesBirth);
    f.email.setValue(email);
    f.landLine.setValue(landLine);
    f.mobilePhone.setValue(mobilePhone);

    return this.evaluateChangesServices.changeEditingPersonalData(false);
  }

  editRequestData (e: Event) {
    e.preventDefault();
    return this.evaluateChangesServices.changeEditingRequestData(true);
  }

  updateRequestData(e: Event) {
    e.preventDefault();

    const form = this.updateRequestForm.value

    this.isFormSubmitted = true;

    const requestData = {
      "request_date": form.dateRequest,
      "id_status": form.statusRequest,
      "id_prevention_type_detail": form.preventionsTypesDetails,
       "assurance": form.haveInsurance,
       "reg_type":  form.directionToUse,
       "dir_wots": form.addressWots[0]?.addressWots,
       "id_location": form.addressRegisteredToPage[0]?.location,
       "way_number": form.addressRegisteredToPage[0]?.numberStreet,
       "id_property_type": form.addressRegisteredToPage[0]?.propertyType,
       "property_number": form.addressRegisteredToPage[0]?.nameHome,
       "latitude": 1000,
        "longitude": 2000,
       "rut_employee": JSON.parse(sessionStorage.getItem('auth-user')),

}

    if(this.updateRequestForm.status === 'INVALID') return;

    this.dateService.UpdateRequestData(this.idRequest, this.rutEmployee, requestData).subscribe((result) => {

    },
    error => {

      let title: string = ''
      let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
      this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      this.fullAddress = '';

      this.evaluateChangesServices.changeEditingRequestData(false);

      let title: string = ''
      let message: string = "Los datos personales se han actualizado exitosamente";
      this.modalService.OpenModalError2(ModalComponent, false, title, message);

    })
  }

  cancelEditRequestData (e: Event) {
    e.preventDefault();

    const f = this.updateRequestForm.controls;
    const fn = this.updateRequestForm.controls.addressRegisteredToPage.controls[0]?.controls;
    const fw = this.updateRequestForm.controls.addressWots.controls[0]?.controls;

    const { preventionsTypes, preventionsTypesDetails, haveInsurance, originDirection, idLocation, wayNumber, idPropertyType, propertyNumber, addressWots} = this.dataRequest[0];

    f.preventionsTypes.setValue(preventionsTypes);

    this.changePrevision(preventionsTypes);

    f.preventionsTypesDetails.setValue(preventionsTypesDetails);
    f.haveInsurance.setValue(haveInsurance);
    f.directionToUse.setValue(originDirection);

    fn.location.setValue(idLocation);
    fn.numberStreet.setValue(wayNumber);
    fn.propertyType.setValue(idPropertyType);
    fn.nameHome.setValue(propertyNumber);
    fw.addressWots.setValue(addressWots);
    // if ( this.updateRequestForm.value.directionToUse !== 'wots') {
    // }

    // if ( this.updateRequestForm.value.directionToUse === 'wots') {
    // }

    return this.evaluateChangesServices.changeEditingRequestData(false);
  }

  editDocument (e: Event) {
    e.preventDefault();
    return this.evaluateChangesServices.changeEditingDocuments(true);
  }

  updateDocuments(e: Event) {

    e.preventDefault();

    const form = this.updateRequestForm.value

    this.isFormSubmitted = true;

    if(this.updateRequestForm.status === 'INVALID') return;

    if(this.listDocumentsDelete.length !== 0 ) {
      this.deleteDocuments();
    }

    if(this.listFilesUpload.length !== 0) {

      this.listFilesUpload.map(res => {

        this.uploadFiles(res.fileData, res.id_document_type);

      })

      this.listFilesUpload = [];
    }

    let title: string = ''
    let message: string = "Los archivos se han actualizado exitosamente";
    this.modalService.OpenModalError2(ModalComponent, false, title, message);

    this.evaluateChangesServices.changeEditingDocuments(false);
  }

  uploadFiles(file, type) {

    const  dataFiles: any = new FormData();
    dataFiles.append("document_path", file);


    this.dateService.UpdateDocuments(this.idRequest, type, dataFiles).subscribe((result) => {

    },
    error => {

      // let title: string = ''
      // let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
      // this.modalService.OpenModalError2(ModalComponent, true, title, message);


    },
    () => {

      // let title: string = ''
      // let message: string = "Los datos personales se han actualizado exitosamente";
      // this.modalService.OpenModalError2(ModalComponent, false, title, message);

    })

  }

  deleteDocuments() {


    const listFilesUpload = {
      id_doc: this.listDocumentsDelete
    }

    // if (true) return

    this.dateService.deleteDocuments(listFilesUpload).subscribe((result) => {

    },
    error => {

      // let title: string = ''
      // let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
      // this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      // this.isEditingAdditionalInformation = false;

      // let title: string = ''
      // let message: string = "Los datos personales se han actualizado exitosamente";
      // this.modalService.OpenModalError2(ModalComponent, false, title, message);

      this.listDocumentsDelete = [];

    })

  }

  cancelEditDocument (e: Event) {
    e.preventDefault();

    this.listDocumentsDelete = [];

    this.listFilesUpload = []

    this.statusDocuments();

    this.willBeDeleted();

    return this.evaluateChangesServices.changeEditingDocuments(false);
  }

  statusDocuments() {

    this.dataDocumentsArray.clear();
    this.dataDocuments2Array.clear();

    if (this.documentsPre.length === 0) {
      this.addDocument();
    }
    if (this.documentsDom.length === 0) {
      this.addDocument2 ();
    }
  }

  deleteFile(e: Event, idFile: any) {

    e.preventDefault();

    this.listDocumentsDelete.push(idFile);

  }

  recoverFile(e: Event, idFile: any) {

    e.preventDefault();

    this.listDocumentsDelete = this.listDocumentsDelete.filter(list => list !== idFile )


  }

  willBeDeleted( idDocument: any = 0 ) {

    if(this.listDocumentsDelete.includes(idDocument)) return true;

    return false;

  }

  editAdditionalInformation (e: Event) {
    e.preventDefault();
    return this.evaluateChangesServices.changeEditingAdditionalInformation(true);
  }

  updateAdditionalInformation(e: Event) {
    e.preventDefault();

    const form = this.updateRequestForm.value

    this.isFormSubmitted = true;

    const personalData = {
      "carer": form.isCaretaker,
      "id_motive": form.dataCaretaker[0]?.reason,
      "id_dedication": form.dataCaretaker[0]?.dedicationsTypes,
      "id_remuneration": form.dataCaretaker[0]?.remunerationType,
      "comments": form.comments
    }

    if(this.updateRequestForm.status === 'INVALID') return;

    this.dateService.UpdateAdditionalInformation(this.idRequest, personalData).subscribe((result) => {

    },
    error => {

      let title: string = ''
      let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
      this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      this.evaluateChangesServices.changeEditingAdditionalInformation(false);;

      let title: string = ''
      let message: string = "Los datos personales se han actualizado exitosamente";
      this.modalService.OpenModalError2(ModalComponent, false, title, message);

    })
  }

  cancelEditAdditionalInformation (e: Event) {
    e.preventDefault();

    const f = this.updateRequestForm.controls;
    const fc = this.updateRequestForm.controls.dataCaretaker.controls[0]?.controls;


    const { isCaretaker, motive, remuneration, dedication} = this.dataRequest[0];

    f.isCaretaker.setValue(isCaretaker);

    this.statusCaretaker(isCaretaker);

    return this.evaluateChangesServices.changeEditingAdditionalInformation(false);
  }

  getDataUserModified() {

    console.log(this.idRequest);
    this.evaluateChangesServices.modifiedDataUser(this.idRequest).subscribe((result) => {

      console.log(result);


      this.modifiedData['user_data'] = result;


    },
    errors => {

    },
    () => {

    })

  }



  dataSelectForm () {

    this.dateService.dropdownInfo().subscribe((result) => {

      this.locations = result.locations;
      this.preventionsTypes = result.preventions_types;
      this.dataPreventionDetails = result.preventions_types_details;
      this.propertyTypes = result.property_types;
      this.motives = result.motives;
      this.dedicationsTypes = result.dedications;
      this.remunerationsTypes = result.remunerations;
      this.genders = result.sex;
      this.listStatus = result.status;


      result.preventions_types_details.map((res: any) => {
        if (res.id_prevention_type === 1) {
          this.preventionDetails.push(res);
        } else if (res.id_prevention_type === 2) {
          this.preventionDetails.push(res);

        } else if (res.id_prevention_type === 3) {
          this.preventionDetails.push(res);

        }
        else {
          this.preventionDetails.push(res);
        }
      });


    }, error => {

    },
    () =>{

    this.getDataRequestForId();


    })
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.approvalSubscription.unsubscribe();
  }
}
