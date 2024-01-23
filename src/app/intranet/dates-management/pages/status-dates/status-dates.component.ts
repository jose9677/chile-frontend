import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatesService } from '../../shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { VisitorDataComponent } from '../visitor-data/visitor-data.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import {default as mockDataRequestForId} from '../../mocks/dataRequesForId.json'
import {default as mockDataForm} from '../../mocks/dataSelectForm.json'

@Component({
  selector: 'app-status-dates',
  templateUrl: './status-dates.component.html',
  styleUrls: ['./status-dates.component.scss']
})
export class StatusDatesComponent implements OnInit {

  public isEditingPersonalData: boolean;
  public isEditingRequestData: boolean;
  public isEditingDocuments: boolean;
  public isEditingAdditionalInformation: boolean;
  public isFormSubmitted: boolean;

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

  public preventionDetails: any[];

  public preventionDetailRequest: any;

  public remunerationsTypes: any[];

  public motives: any[];

  public dedicationsTypes: any[];

  public typeProperty: any;

  public fullAddress: any;

  private dataRequest: any[];

  public documentsRequest: any[];



  public updateRequestForm: any = this.fb.group({
    rut: ['', [Validators.required]],
    names: ['',[Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
    lastNames: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/)]],
    gender: ['', [ Validators.required]],
    datesBirth: ['', [Validators.required]],
    email: ['', [Validators.required, CustomValidators.email]],
    landLine: ['', [Validators.minLength(9)]],
    mobilePhone: ['', [Validators.required, Validators.minLength(9)]],

    requestNumber: ['', [Validators.required]],
    dateRequest: ['', [Validators.required]],
    statusRequest: ['', [Validators.required]],
    preventionsTypes: ['', [Validators.required]],
    preventionsTypesDetails: ['', [Validators.required]],
    haveInsurance: ['', [Validators.required]],
    directionToUse: ['', [Validators.required]],
    addressRegisteredToPage: this.fb.array([]),
    addressWots: this.fb.array([]),

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
    private modalService: ModalsService,
    private fb: FormBuilder

  ) {

    this.today = new Date()
      this.today = `${this.today.getFullYear()}-${(this.today.getMonth())+1}-${this.today.getDate()}`

    this.isEditingPersonalData = false
    this.isEditingRequestData = false
    this.isEditingDocuments = false
    this.isEditingAdditionalInformation = false
    this.isFormSubmitted = false;

    this.documentsDom = [];

    this.documentsPre = [];


    this.unassignedRequest = [];

    this.dataRequest = [];

    this.documentsRequest = []

  }

  ngOnInit(): void {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.fillOptionsSelectForm(mockDataForm);

    this.getDataRequestForId();

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
    const dataForm = this.fb.group({
      location: ['', [Validators.required]],
      numberStreet: ['', [Validators.required]],
      propertyType: ['', [Validators.required]],
      nameHome: ['', [Validators.required]]
    })
    this.updateRequestForm.controls.directionToUse.setValue(1);
    this.directionRegisteredOnThePageArray.push(dataForm);
  }

  deleteDirectionRegisteredOnThePageForm() {

    this.directionRegisteredOnThePageArray.clear();
  }

  get addressWotsArray() {
    return this.updateRequestForm.controls['addressWots'] as FormArray
  }

  addAddressWots() {
    const dataForm = this.fb.group({
      addressWots: ['', [Validators.required]]
    })
    this.updateRequestForm.controls.directionToUse.setValue(2);

    this.addressWotsArray.push(dataForm);
  }

  deleteAddressWots() {

    this.addressWotsArray.clear();
  }

  statusOriginAddress( origin: any ) {

    if (origin === 1) this.addDirectionRegisteredOnThePageForm(), this.deleteAddressWots();
    if (origin === 2) this.addAddressWots(), this.deleteDirectionRegisteredOnThePageForm();

  }

  changeOriginAddress( e: any ) {

    e.preventDefault;

    this.statusOriginAddress(e);
    const f = this.updateRequestForm.controls.addressRegisteredToPage.controls[0]?.controls;
    const fw = this.updateRequestForm.controls.addressWots.controls[0]?.controls;

    const { idLocation, wayNumber, idPropertyType, propertyNumber, addressWots} = this.dataRequest[0];

    if ( e === 1) {
      f.location.setValue(idLocation);
      f.numberStreet.setValue(wayNumber);
      f.propertyType.setValue(idPropertyType);
      f.nameHome.setValue(propertyNumber);
    }

    if ( e === 2) {
      fw.addressWots.setValue(addressWots)
    }
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

    if (status === true) return this.addDateCaretaker();

    return this.deleteDataCaretaker();

  }

  fillForm(data: any) {

    data.map((res: any)=>{
      const {rut, names, lastNames, gender, datesBirth, email, landLine, mobilePhone, haveInsurance,idRequest, dateRequest, statusRequest, preventionsTypes, preventionsTypesDetails, originDirection, idLocation, wayNumber,idPropertyType, propertyNumber, addressWots, isCaretaker, motive, dedication, remuneration, registeredInAPS, discountPercentage, dataOrigin, comments } = res;

      console.log(res);

      const f = this.updateRequestForm.controls;

      f.rut.setValue(rut);
      f.names.setValue(names);
      f.lastNames.setValue(lastNames);
      f.gender.setValue(gender)
      f.datesBirth.setValue(datesBirth);
      f.email.setValue(email);
      f.landLine.setValue(landLine);
      f.mobilePhone.setValue(mobilePhone);
      f.haveInsurance.setValue(haveInsurance);

      f.requestNumber.setValue(idRequest);
      f.dateRequest.setValue(dateRequest);
      f.statusRequest.setValue(statusRequest);
      f.preventionsTypes.setValue(preventionsTypes);
      f.preventionsTypesDetails.setValue(preventionsTypesDetails);

      f.directionToUse?.setValue(originDirection);

      this.statusOriginAddress(this.updateRequestForm.value.directionToUse);

      f.addressRegisteredToPage.controls[0]?.controls.location.setValue(idLocation);
      f.addressRegisteredToPage.controls[0]?.controls.numberStreet.setValue(wayNumber);
      f.addressRegisteredToPage.controls[0]?.controls.propertyType.setValue(idPropertyType);
      f.addressRegisteredToPage.controls[0]?.controls.nameHome.setValue(propertyNumber);

      f.addressWots.controls[0]?.controls.addressWots.setValue(addressWots);

      this.fullAddress = () => {

        if (this.updateRequestForm.value.directionToUse === 2) return this.updateRequestForm.value.addressWots[0].addressWots;


        let street = this.locationChange();

        let typeProperty = this.typePropertyChange();

        return `${street}, ${this.updateRequestForm.value.addressRegisteredToPage[0].numberStreet ? this.updateRequestForm.value.addressRegisteredToPage[0].numberStreet : 's/n'}, ${typeProperty}, ${this.updateRequestForm.value.addressRegisteredToPage[0].nameHome ? this.updateRequestForm.value.addressRegisteredToPage[0].nameHome : 's/n'}`
      }

      this.preventionTypeRequest =  this.preventionsTypes.find(({id}) => id === Number(this.updateRequestForm.value.preventionsTypes));
      this.preventionTypeRequest = this.preventionTypeRequest.description;

      this.preventionDetailRequest = this.preventionDetails.find(({id})=> id === Number( this.updateRequestForm.value.preventionsTypesDetails));
      this.preventionDetailRequest = this.preventionDetailRequest.description;


      f.isCaretaker.setValue(isCaretaker);
      this.statusCaretaker(isCaretaker);

      f.dataCaretaker.controls[0]?.controls.reason.setValue(motive);
      f.dataCaretaker.controls[0]?.controls.dedicationsTypes.setValue(dedication);
      f.dataCaretaker.controls[0]?.controls.remunerationType.setValue(remuneration);
      f.registeredInAPS.setValue(registeredInAPS),
      f.discountPercentage.setValue(discountPercentage),
      f.dataOrigin.setValue(dataOrigin),
      f.comments.setValue(comments)


    //   this.unassignedRequest.push(res);

    //   if ( res.id_document_type === 1 ) {
    //     this.documentsDom.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext});

    //   }
    //   else if ( res.id_document_type === 2 ) {
    //     this.documentsPre.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext})
    //   }
    })
  }



  locationChange() {
    let street = (this.locations.find(({id}) => id === Number(this.updateRequestForm.value.addressRegisteredToPage[0].location)));
    return street = street.street;
  }

  typePropertyChange() {
    let type = this.propertyTypes.find(({id}) => id === Number(this.updateRequestForm.value.addressRegisteredToPage[0]?.propertyType))

    return this.typeProperty = type.description;

  }

  getDataRequestForId() {

    let dataRequest: any = [];

    // this.dateService.getForIdRequest(this.idRequest).subscribe((result) => {
    //   console.log(result);

    // },
    // error => {

    //   this.errors = true;


    // },
    // () => {


    // });

    mockDataRequestForId.map((res: any) => {
      console.log(res);

      const { rut, names: names, lastname: lastNames, id_sex, f_nac: datesBirth, email, landline: landLine, mobile_phone: mobilePhone } = res.user_data[0]

      const { id_solicitude: id_request, request_date, id_status, id_prevention_type_detail, prevention_type: id_prevention_type, assurance, origin : id_origin_direction, longitude, latitude, id_location, way_number, id_property_type, property_number, address_wots } = res.data_sol[0];

      const { documents } = res.data_doc;

      const { cuidador: carer, id_motive, id_dedication, id_remuneration, aps, porcentaje_descuento: percent, origen: origin, comments } = res.aditional_data[0];


      // const {  , } = res;

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

        originDirection: id_origin_direction,
        addressWots: address_wots,
        idLocation: id_location,
        wayNumber: way_number,
        idPropertyType: id_property_type,
        propertyNumber: property_number,

        isCaretaker: carer,
        motive: id_motive,
        dedication: id_dedication,
        remuneration: id_remuneration,
        registeredInAPS: aps,
        discountPercentage: percent,
        dataOrigin: origin,
        comments: comments
      })

      this.documentsRequest = documents;
    })

    this.fillForm(dataRequest);

    return this.dataRequest.push(dataRequest[0]);

  }


  updateRequest() {

  }
  return() {
    this.router.navigate(['/'])

  }

  visitador(){
    this.modalService.openModalData(VisitorDataComponent, this.unassignedRequest[0]?.rut_assistant)
  }

  editPersonalData (e: Event) {
    e.preventDefault();
    return this.isEditingPersonalData = !this.isEditingPersonalData;
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

    return this.isEditingPersonalData = !this.isEditingPersonalData;
  }

  editRequestData (e: Event) {
    e.preventDefault();
    return this.isEditingRequestData = !this.isEditingRequestData;
  }

  cancelEditRequestData (e: Event) {
    e.preventDefault();

    const f = this.updateRequestForm.controls;
    const fn = this.updateRequestForm.controls.addressRegisteredToPage.controls[0]?.controls;
    const fw = this.updateRequestForm.controls.addressWots.controls[0]?.controls;

    const { preventionsTypes, preventionsTypesDetails, haveInsurance, originDirection, idLocation, wayNumber, idPropertyType, propertyNumber, addressWots} = this.dataRequest[0];

    f.preventionsTypes.setValue(preventionsTypes);
    f.preventionsTypesDetails.setValue(preventionsTypesDetails);
    f.haveInsurance.setValue(haveInsurance);
    f.directionToUse.setValue(originDirection);

    if ( this.updateRequestForm.value.directionToUse === 1) {
      fn.location.setValue(idLocation);
      fn.numberStreet.setValue(wayNumber);
      fn.propertyType.setValue(idPropertyType);
      fn.nameHome.setValue(propertyNumber);
    }

    if ( this.updateRequestForm.value.directionToUse === 2) {
      fw.addressWots.setValue(addressWots)
    }

    return this.isEditingRequestData = !this.isEditingRequestData;
  }

  editDocument (e: Event) {
    e.preventDefault();
    return this.isEditingDocuments = !this.isEditingDocuments;
  }

  editAdditionalInformation (e: Event) {
    e.preventDefault();
    return this.isEditingAdditionalInformation = !this.isEditingAdditionalInformation;
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }
}
