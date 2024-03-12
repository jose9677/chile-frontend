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
import { LoggedService } from 'src/app/shared/services/logged.service';
import { TermsAndConditionsComponent } from 'src/app/public/auth/pages/register/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from 'src/app/public/auth/pages/register/privacy-policy/privacy-policy.component';
import { result } from 'underscore';

@Component({
  selector: 'app-status-dates',
  templateUrl: './status-dates.component.html',
  styleUrls: ['./status-dates.component.scss']
})
export class StatusDatesComponent implements OnInit {

  private subscription: Subscription;
  // private approvalSubscription: Subscription;


  public isEditingPersonalData: Observable<boolean>;
  public isEditingRequestData: Observable<boolean>;
  public isEditingDocuments: Observable<boolean>;
  public isEditingAdditionalInformation: Observable<boolean>;

  public isFormSubmitted: boolean;
  public documentIsValid: boolean;

  public isRenovationEdited: boolean;

  public maxDate: any;
  public minDate: any;

  public errors: any = null;

  private idRequestSubscription: Subscription;
  private idRenovationSubscription: Subscription;
  private rutUseSubscription: Subscription;

  public idRequest: any;

  public idRenovation: any;

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

  public rolUser: any;

  public rutEmployee: any;
  public rutNeighbor: any;

  public modifiedData: any = [];
  public originalData: any = [];

  public editingStatus: any = ['1','2'];

  public isNewRequest: boolean;

  private validateNewRequest: any = Validators.required;

  public mask: any;
  public prefix: any;

  public mask2: any;
  public prefix2: any;


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

  public updateRequestForm: any;

  constructor(
    private routerQuery: ActivatedRoute,
    private router: Router,
    private dateService: DatesService,
    private evaluateChangesServices: EvaluateChangesService,
    private modalService: ModalsService,
    private fb: FormBuilder,
    private loggedService: LoggedService

  ) {



    this.isFormSubmitted = false;
    this.documentIsValid = false;
    this.isNewRequest = false;
    this.isRenovationEdited = false;

    this.rolUser = JSON.parse(window.sessionStorage.getItem("rol-user"));

    this.rutEmployee = JSON.parse(window.sessionStorage.getItem("auth-user"));

    this.maxDate = new Date();
    this.maxDate = `${this.maxDate.getFullYear() - 1}-${(this.maxDate.getMonth())+1}-${this.maxDate.getDate()}`;

    this.minDate = new Date();
    this.minDate = `${this.minDate.getFullYear() - 124 }-${(this.minDate.getMonth())+1}-${this.minDate.getDate()}`;

    this.rutUseSubscription = this.routerQuery.queryParams.subscribe(rut_user => this.rutNeighbor = rut_user.rut_user);

    this.idRenovationSubscription = this.routerQuery.queryParams.subscribe(idRenovation => this.idRenovation = idRenovation.id_renovation);


    if(this.router.url === '/citas/crear-cita') this.rutNeighbor = this.rutEmployee;

    if(this.rutNeighbor) {

      this.isNewRequest = true;

      this.validateNewRequest = Validators.nullValidator;
    }


    this.updateRequestForm = this.fb.group({
      rut: ['', []],
      names: ['',[ Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
      lastNames: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
      gender: ['', [ Validators.required]],
      datesBirth: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.minLength(9)]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9)]],

      requestNumber: ['', []],
      dateRequest: ['', []],
      statusRequest: ['', []],
      statusEmp: ['', [this.validateNewRequest]],
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
      comments: ['', []],
      authCheck: ['', this.isNewRequest || this.idRenovation ? [ Validators.required ] : [ Validators.nullValidator ] ]
    });


    this.documentsDom = [];

    this.documentsPre = [];

    this.listDocumentsDelete = [];

    this.preventionDetails = [];

    this.unassignedRequest = [];

    this.dataRequest = [];

    this.listFilesUpload = [];


  }

  ngOnInit(): void {


    this.isEditingPersonalData = this.evaluateChangesServices.editingPersonalDataObservable;
    this.isEditingRequestData = this.evaluateChangesServices.EditingRequestDataObservable;
    this.isEditingDocuments = this.evaluateChangesServices.EditingDocumentsObservable;
    this.isEditingAdditionalInformation = this.evaluateChangesServices.EditingAdditionalInformationObservable;

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);



    if(this.idRenovation) {
      this.idRequest = this.idRenovation
    }


    this.subscription = this.dateService.refresh$.subscribe( () => {
      // this.getDataRequestForId();
      this.dataSelectForm();
    })

    // this.approvalSubscription = this.evaluateChangesServices.refresh$.subscribe( () => {

    //   this.getDataUserModified();
    //   this.getDataRequestForId();

    //   // this.dataSelectForm();
    // })


    if (this.rutNeighbor) {

      const isExpiredRequest = JSON.parse(sessionStorage.getItem('isExpiredRequest'));

      if(!isExpiredRequest) {

        let title: string = ''
        let message = "No es posible generar una nueva solicitud, usted ya posee una solicitud activa";

        this.modalService.OpenModalError2(ModalComponent, true, title, message);

        this.router.navigate(['/']);

        return

      }


    }

    this.dataSelectForm();

    this.willBeDeleted();

    // this.getDataUserModified();

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
    let validatorRegisterToPage = this.updateRequestForm.value.directionToUse !== 'wots' ? Validators.required : Validators.nullValidator;

    const dataForm = this.fb.group({
      location: ['', [validatorRegisterToPage]],
      numberStreet: ['', [validatorRegisterToPage, CustomValidators.number]],
      propertyType: ['', [validatorRegisterToPage]],
      nameHome: ['', [validatorRegisterToPage, Validators.maxLength(100)]]
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

      if ( this.isNewRequest ) return;

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

    if (this.dataDocumentsArray.value.length > 1 || (this.documentsPre.length - this.count) !== 0 ) {
      this.dataDocumentsArray.removeAt(DocumentIndex);
    }

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

    if (this.dataDocuments2Array.length > 1 || (this.documentsDom.length - this.count2) !== 0 ) {
      this.dataDocuments2Array.removeAt(DocumentIndex);
    }

  }

  selectdataFile(event: any, index: any, id_document_type: any): void {

    const file = <File>event.target.files[0];

  this.documentIsValid = true;


  if ( file != undefined ) {

    if ( file.type == "image/jpeg" || file.type == "application/pdf" || file.type == "image/png") {

      if( this.isNewRequest) {

        this.listFilesUpload.push({'document_path': file, 'id_document_type': id_document_type, 'rut_user': this.rutNeighbor ? this.rutNeighbor : this.updateRequestForm.value.rut });
      } else {

        this.listFilesUpload.push({'fileData': file, 'id_document_type': id_document_type});

      }

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

    this.mask = '0  0000 - 0000';
    this.prefix = '+56  ';

    let data : any [] = [];
    data = dataRequest;

    data.map((res: any)=>{
      const {rut, names, lastNames, gender, datesBirth, email, landLine, mobilePhone, haveInsurance,idRequest, dateRequest, statusRequest, statusEmp, preventionsTypes, preventionsTypesDetails, originDirection, idLocation, wayNumber,idPropertyType, propertyNumber, addressWots, isCaretaker, motive, dedication, remuneration, registeredInAPS, discountPercentage, dataOrigin, comments, documents } = res;

      const f = this.updateRequestForm.controls;

      if(!this.evaluateChangesServices.viewEditingPersonalData() || this.isNewRequest) {
        f.rut.setValue(rut);
        f.names.setValue(names);
        f.lastNames.setValue(lastNames);
        f.gender.setValue(gender)
        f.datesBirth.setValue(datesBirth);
        f.email.setValue(email);
        f.landLine.setValue(landLine);
        f.mobilePhone.setValue(mobilePhone);
      }

      if(!this.evaluateChangesServices.viewEditingRequestData() || this.isNewRequest) {

        f.haveInsurance.setValue(haveInsurance);

        f.requestNumber.setValue(idRequest);

        f.dateRequest.setValue(dateRequest);


        // this.statusRequest = this.status.find(({id}) => id === Number(statusRequest))
        // this.statusRequest = this.statusRequest.status;

        f.statusRequest.setValue(statusRequest);

        f.statusEmp.setValue(statusEmp);

        f.preventionsTypes.setValue(preventionsTypes);

        this.changePrevision(preventionsTypes);

        f.preventionsTypesDetails.setValue(preventionsTypesDetails);

        this.changePrevisionTypes(preventionsTypesDetails);


        if ( this.isNewRequest ){

          f.directionToUse?.setValue('REGISTRO POR PAGINA');

        }else {

          f.directionToUse?.setValue(originDirection.toUpperCase());

        }

        this.statusOriginAddress();

        f.addressWots.controls[0]?.controls.addressWots.setValue(addressWots);

        f.addressRegisteredToPage.controls[0]?.controls.location.setValue(idLocation);
        f.addressRegisteredToPage.controls[0]?.controls.numberStreet.setValue(wayNumber);
        f.addressRegisteredToPage.controls[0]?.controls.propertyType.setValue(idPropertyType);
        f.addressRegisteredToPage.controls[0]?.controls.nameHome.setValue(propertyNumber);

        this.generateFullAddress();
      }


      if( this.evaluateChangesServices.viewEditingDocuments() &&  this.listFilesUpload.length !== 0) this.listFilesUpload = [];

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

      if(!this.evaluateChangesServices.viewEditingAdditionalInformation() || this.isNewRequest) {

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
    this.statusDocuments();
    this.preventionDetails = preventionDetails;

    this.preventionTypeRequest =  this.preventionsTypes?.find(({id}) => id === Number(this.updateRequestForm.value.preventionsTypes));

    this.preventionTypeRequest = this.preventionTypeRequest?.prevention_type;
  }

  changePrevisionTypes( e: Event) {


    this.preventionDetailRequest = this.preventionDetails.find(({id})=> id === Number( this.updateRequestForm.value.preventionsTypesDetails));

    this.preventionDetailRequest = this.preventionDetailRequest?.prevention_detail;

  }

  locationChange() {
    let street = (this.locations.find(({id}) => id === Number(this.updateRequestForm.value.addressRegisteredToPage[0]?.location)));
    return street = street?.street;
  }

  typePropertyChange() {
    let type = this.propertyTypes.find(({id}) => id === Number(this.updateRequestForm.value.addressRegisteredToPage[0]?.propertyType))

    return this.typeProperty = type?.description;

  }

  getDataRequestForId(idRequest = this.idRequest) {

    let dataRequest: any = [];

    this.dateService.getForIdRequest(idRequest).subscribe((result) => {
      this.originalData = result;
      let data: any[] = [];
      data = [result];

      data.map((res: any) => {

        const { rut, names: names, lastname: lastNames, id_sex, f_nac: datesBirth, email, landline: landLine, mobile_phone: mobilePhone,  id_mod_status: statusModDataUser } = res.user_data[0]

        const { id_solicitude: id_request, request_date, id_status, id_status_emp, id_prevention_type_detail, prevention_type: id_prevention_type, assurance, reg_type : id_origin_direction, longitude, latitude, id_location, way_number, id_property_type, property_number, dir_wots: address_wots } = res.data_sol[0];


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
          statusEmp: id_status_emp,
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

  getDataUserForRut() {

    this.evaluateChangesServices.changeEditingPersonalData(true);
    this.evaluateChangesServices.changeEditingRequestData(true);
    this.evaluateChangesServices.changeEditingDocuments (true);
    this.evaluateChangesServices.changeEditingAdditionalInformation(true);

    let dataUser: any[] = [];

    this.dateService.getDataUserForRut(this.rutNeighbor).subscribe((result) => {

      const {names, lastname, id_sex, f_nac, email, landline, mobile_phone, origin} = result[0];

      dataUser.push({
        rut: this.rutNeighbor,
        names: names,
        lastNames: lastname,
        gender: id_sex,
        datesBirth: f_nac,
        email: email,
        landLine: landline,
        mobilePhone: mobile_phone,
        // idRequest: '',
        // dateRequest: '',
        // statusRequest: '',
        // statusEmp: '',
        // preventionsTypes: 4,
        // preventionsTypesDetails: 13,
        // haveInsurance: '',
        // statusModDataUser: '',

        originDirection: (origin === 'WOTS') || (origin === 'wots') ? origin : 'REGISTRO POR PAGINA',
        // addressWots: address_wots ? address_wots : 'n/a',
        // idLocation: id_location,
        // wayNumber: way_number,
        // idPropertyType: id_property_type,
        // propertyNumber: property_number,

        // documents: res.data_doc,

        // isCaretaker: carer,
        // motive: id_motive,
        // dedication: id_dedication,
        // remuneration: id_remuneration,
        // registeredInAPS: aps === true ? 'Si' : 'No',
        // discountPercentage: percent,
        // dataOrigin: origin ? origin : 'REGISTRO POR PAGINA',
        // comments: comments
      })
    },
    error => {

    },
    () => {
      this.fillForm(dataUser);
    })

  }

  generateFullAddress = () => {

    if (this.updateRequestForm.value.directionToUse === 'WOTS') return this.fullAddress = this.updateRequestForm.value.addressWots[0]?.addressWots;

    let street = this.locationChange();

    let typeProperty = this.typePropertyChange();

    return this.fullAddress = `${street} ${this.updateRequestForm.value.addressRegisteredToPage[0]?.numberStreet ? this.updateRequestForm.value.addressRegisteredToPage[0]?.numberStreet : 's/n'}, ${typeProperty}, ${this.updateRequestForm.value.addressRegisteredToPage[0]?.nameHome ? this.updateRequestForm.value.addressRegisteredToPage[0].nameHome : 's/n'}`;

  };

  return() {
    this.router.navigate(['/']);
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

    if(
      this.updateRequestForm.controls.names.errors ||
      this.updateRequestForm.controls.lastNames.errors ||
      this.updateRequestForm.controls.gender.errors ||
      this.updateRequestForm.controls.datesBirth.errors ||
      this.updateRequestForm.controls.email.errors ||
      this.updateRequestForm.controls.mobilePhone.errors
      ) return;

    this.dateService.UpdatePersonalData(this.idRequest, personalData).subscribe((result) => {

    },
    error => {
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
      "id_status_emp": form.statusEmp,
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

    if(
      this.updateRequestForm.controls.statusEmp.errors ||
      this.updateRequestForm.controls.preventionsTypesDetails.errors ||
      this.updateRequestForm.controls.haveInsurance.errors ||
      this.updateRequestForm.controls.directionToUse.errors ||
      this.updateRequestForm.controls.addressRegisteredToPage.controls[0].controls.location.errors ||
      this.updateRequestForm.controls.addressRegisteredToPage.controls[0].controls.numberStreet.errors ||
      this.updateRequestForm.controls.addressRegisteredToPage.controls[0].controls.propertyType.errors ||
      this.updateRequestForm.controls.addressRegisteredToPage.controls[0].controls.nameHome.errors ||
      this.updateRequestForm.controls.addressWots.controls[0].controls.addressWots.errors
      ) return;

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

    let validationDocuments : any = [];

    e.preventDefault();

    const form = this.updateRequestForm.value;

    this.isFormSubmitted = true;

    this.dataDocumentsArray.controls.map((res: any) => {

      validationDocuments.push(res.controls.document.errors?.required);

    });

    this.dataDocuments2Array.controls.map((res: any) => {

      validationDocuments.push(res.controls.document.errors?.required);

    });


    if( (((validationDocuments.length !== 0) && validationDocuments.includes(true))) || ((validationDocuments.length === 0) && (this.listDocumentsDelete.length === 0)) ) return;

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
    let message: string = "La solicitud se ha creado exitosamente";
    if (this.idRenovation) message = 'La renovación se ha realizado exitosamente';

    this.modalService.OpenModalError2(ModalComponent, false, title, message);


    if ( !this.idRenovation ) this.evaluateChangesServices.changeEditingDocuments(false);
    if ( this.idRenovation ) this.router.navigate(['/']);

    // let title: string = ''
    // let message: string = "Los archivos se han actualizado exitosamente";
    // this.modalService.OpenModalError2(ModalComponent, false, title, message);

  }

  uploadFiles(file, type) {


    const  dataFiles: any = new FormData();
    dataFiles.append("document_path", file);


    this.dateService.UpdateDocuments(this.idRequest, type, dataFiles).subscribe((result) => {

    },
    error => {

      let title: string = ''
      let message: string = "El archivo no puedo ser cargado.";
      this.modalService.OpenModalError2(ModalComponent, false, title, message);


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

      if ((this.updateRequestForm.value.preventionsTypes ) && (this.updateRequestForm.value.preventionsTypes !== 4)) this.addDocument();
    }
    if (this.documentsDom.length === 0) {
      this.addDocument2 ();
    }
  }

  private count: any = 0;
  private count2: any = 0;

  deleteFile(e: Event, idFile: any, typeDocument: any) {

    e.preventDefault();

    this.listDocumentsDelete.push(idFile);

    if (typeDocument === 1) this.count += 1;

    if (typeDocument === 2) this.count2 += 1;

    if(this.dataDocumentsArray.length === 0 && this.documentsPre.length === this.count) {
      this.addDocument()
    };
    if(this.dataDocuments2Array.length === 0 && this.documentsDom.length === this.count2) {
      this.addDocument2()
    };

  }

  recoverFile(e: Event, idFile: any, typeDocument: any) {

    e.preventDefault();

    if (typeDocument === 1) this.count -= 1;

    if (typeDocument === 2) this.count2 -= 1;

    this.listDocumentsDelete = this.listDocumentsDelete.filter(list => list !== idFile );

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

    if(
      this.updateRequestForm.controls.isCaretaker.errors ||
      this.updateRequestForm.controls.dataCaretaker.controls[0]?.controls.reason.errors ||
      this.updateRequestForm.controls.dataCaretaker.controls[0]?.controls.dedicationsTypes.errors ||
      this.updateRequestForm.controls.dataCaretaker.controls[0]?.controls.remunerationType.errors

    ) return;

    this.dateService.UpdateAdditionalInformation(this.idRequest, this.rutEmployee, personalData).subscribe((result) => {

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

    this.evaluateChangesServices.modifiedDataUser(this.idRequest).subscribe((result) => {



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

      if (!this.isNewRequest) {

        return this.getDataRequestForId();

      }

      return this.getDataUserForRut();

    })
  }

  createRequest(e: Event) {

    this.isFormSubmitted = true;

    if( this.updateRequestForm.status !== 'VALID') return;

    const {rut, names, lastNames, gender, datesBirth, email, landLine, mobilePhone, preventionsTypesDetails, haveInsurance, addressRegisteredToPage, authCheck, isCaretaker, dataCaretaker} = this.updateRequestForm.value;

    let dataRequest: any = {
      "rut_user": rut,
      "names": names,
      "lastname": lastNames,
      "id_sex": gender,
      "f_nac": datesBirth,
      "email": email,
      "landline": landLine,
      "mobile_phone": mobilePhone,
      "id_prevention_type_detail": preventionsTypesDetails,
      "assurance": haveInsurance,
      "id_location": addressRegisteredToPage['0'].location,
      "way_number": addressRegisteredToPage['0'].numberStreet,
      "id_property_type": addressRegisteredToPage['0'].propertyType,
      "property_number": addressRegisteredToPage['0'].nameHome,
      "terms_condition": authCheck,
      "carer": isCaretaker,
      "id_motive": dataCaretaker['0']?.reason,
      "id_dedication": dataCaretaker['0']?.dedicationsTypes,
      "id_remuneration": dataCaretaker['0']?.remunerationType
    };

    this.dateService.createRequest(dataRequest).subscribe((result) => {

    },
    error => {

      let title: string = ''
      let message: string = '';

      message = "Ha ocurrido un error intente mas tarde";

      if (error.error === 'this user has a solicitude active') message = "Usted ya posee una solicitud activa";

      this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      this.uploadFilesNewRequest();

    })
  }

  confirmRenovation(e: Event) {

    e.preventDefault();

    this.dateService.confirmRenovation(this.idRenovation).subscribe((result) => {

    },
    error => {

    },
    () => {

      let title: string = ''
      let message: string = 'La renovación se ha realizado exitosamente';

      this.modalService.OpenModalError2(ModalComponent, false, title, message);

      this.router.navigate(['/']);

    })
  }

  confirmRenovationEdited(e: Event) {

    this.isFormSubmitted = true;

    if( this.updateRequestForm.status !== 'VALID') return;

    const {rut, names, lastNames, gender, datesBirth, email, landLine, mobilePhone, preventionsTypesDetails, haveInsurance, addressRegisteredToPage, authCheck, isCaretaker, dataCaretaker} = this.updateRequestForm.value;

    let dataRequest: any = {
      "rut_user": rut,
      "names": names,
      "lastname": lastNames,
      "id_sex": gender,
      "f_nac": datesBirth,
      "email": email,
      "landline": landLine,
      "mobile_phone": mobilePhone,
      "id_prevention_type_detail": preventionsTypesDetails,
      "assurance": haveInsurance,
      "id_location": addressRegisteredToPage['0'].location,
      "way_number": addressRegisteredToPage['0'].numberStreet,
      "id_property_type": addressRegisteredToPage['0'].propertyType,
      "property_number": addressRegisteredToPage['0'].nameHome,
      "terms_condition": authCheck,
      "carer": isCaretaker,
      "id_motive": dataCaretaker['0']?.reason,
      "id_dedication": dataCaretaker['0']?.dedicationsTypes,
      "id_remuneration": dataCaretaker['0']?.remunerationType

    };

    this.dateService.confirmRenovationEdit(this.idRenovation, dataRequest).subscribe((result) => {

    },
    error => {

      let title: string = ''
      let message: string = '';

      message = "Ha ocurrido un error intente mas tarde";

      if (error.error === 'this user has a solicitude active') message = "Usted ya posee una solicitud activa";

      this.modalService.OpenModalError2(ModalComponent, true, title, message);

    },
    () => {

      // this.uploadFilesNewRequest();

      this.updateDocuments(e);

    })
  }

  uploadFilesNewRequest() {

    let count = 0;

    this.listFilesUpload.map((res) => {
      const  dataFiles: any = new FormData();

      dataFiles.append("document_path", res.document_path);
      dataFiles.append("rut_user", res.rut_user);
      dataFiles.append("id_document_type", res.id_document_type);

      this.dateService.uploadFilesNewRequest(dataFiles).subscribe((result) => {

      },
      error => {

        let title: string = ''
        let message: string = "El archivo no puedo ser cargado.";
        this.modalService.OpenModalError2(ModalComponent, false, title, message);

      },
      () => {

        count = count + 1;

        if ( this.listFilesUpload.length === count) {

          let title: string = ''
          let message: string = "La solicitud se ha creado exitosamente";
          if(this.idRenovation) message = 'La renovación se ha realizado exitosamente';
          this.modalService.OpenModalError2(ModalComponent, false, title, message);

          this.router.navigate(['/']);

        }
      });


    })


  }

  canEdit(rolUser) {

    return [4, 5].includes(rolUser);

  }

  valueAuth(e: any) {

    if (e.target.checked === false) {
      this.updateRequestForm.controls.authCheck.reset();
    }

  }

  openTerminosyCondiciones(){
    this.modalService.openModal(TermsAndConditionsComponent)
  }
  openPoliticadePrivacidad(){
    this.modalService.openModal(PrivacyPolicyComponent)
  }


  changeinPhoneNumber(value: any, typeNumber: any) {

    if (value || value === 0) {
      if (value === 0 && typeNumber === 1) this.updateRequestForm.controls.landLine.setValue('');

      if (value === 0 && typeNumber === 2) this.updateRequestForm.controls.mobilePhone.setValue('');
    }
  }

  editRenovation(e: Event) {

    this.isRenovationEdited = true;

    this.editPersonalData(e);
    this.editRequestData(e);
    this.editDocument(e);
    this.editAdditionalInformation(e);
  }

  cancelEditRenovation(e: Event) {

    this.isRenovationEdited = false;

    this.cancelEditPersonalData(e);
    this.cancelEditRequestData(e);
    this.cancelEditDocument(e);
    this.cancelEditAdditionalInformation(e);
  }
  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
    this.idRenovationSubscription.unsubscribe();
    this.rutUseSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.evaluateChangesServices.changeEditingPersonalData(false);
    this.evaluateChangesServices.changeEditingRequestData(false);
    this.evaluateChangesServices.changeEditingDocuments (false);
    this.evaluateChangesServices.changeEditingAdditionalInformation(false);

    // this.approvalSubscription.unsubscribe();
  }
}
