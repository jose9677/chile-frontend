import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddServicesComponent implements OnInit {

  @Input () data: any; data2: any; data3: any;

  public isAddServices: boolean;

  // public isUploadedData: boolean;

  private dataServiceUser: any[];

  private providerServices: any;

  public listServicesCopago: any[];

  public listTypesService : any[];

  public selectedTypeService: any;

  public listServices: any[];

  public selectedServices: any;

  public amountServicesUser!: any;

  private dataServices: any[];

  private dataTypeServices: any[];

  public formAddService: any;


  constructor(
    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    public serviceCopago: ServiceCopagoService
  ) {

    this.isAddServices = false;

    // this.isUploadedData = false;

    this.dataServiceUser = [];

    this.dataServices = [];

    this.dataTypeServices = [];

    this.listServicesCopago = [];

    this.listTypesService = [];

    this.selectedTypeService = null;

    this.listServices = [];

    this.selectedServices= null;

    this.amountServicesUser = null;
  }

  ngOnInit(): void {

    this.providerServices = this.data;

    this.serviceCopago.getServicesCategories().subscribe(result => {

      let listTypesService: any[] = [];

      this.dataServices = result.services;

      this.dataTypeServices = result.categories;

      result.categories.map((res: any) => {

        listTypesService.push({"id": res.id, "typeService": res.description});

      })

      this.listTypesService = listTypesService;

      let listServices: any[] = [];

      this.dataServices.map((res: any) => {

        listServices.push({"id": res.id, "nameService": res.description});

      })

      this.listServices = listServices;
    },
    error => {

    },
    () => {

      // this.isUploadedData = true;

    });

    if (this.data2 != undefined) {

      this.dataServiceUser.push(this.data2);

      this.selectedTypeService = this.dataServiceUser[0].idTypeService;
      this.selectedServices = this.dataServiceUser[0].idService;
      this.amountServicesUser = this.dataServiceUser[0].amountServices;

    }

    this.formAddService = this.fb.group({
      typeService: [this.selectedTypeService, [ Validators.required ]],
      nameService: [ this.selectedServices, [ Validators.required ]],
      amountServices: [ this.amountServicesUser, [ Validators.required ]]

    })

  }

  getListServices () {

    this.formAddService.controls.nameService.reset();

    this.listServices = [];

    let listServices: any[] = [];

      this.dataServices.map((res: any) => {

        if ((res.id_provider == this.providerServices) && (this.formAddService.value.typeService == res.id_category)) {

          listServices.push({"id": res.id, "nameService": res.description})

        }

      })

      this.listServices = listServices;
  }

  addServices(e: Event) {

    e.preventDefault();

    this.isAddServices = true;

    let codeService: any = '';
    let idTypeService: any = this.formAddService.value.typeService;
    let nameTypeService: any = '';
    let idService: any = this.formAddService.value.nameService;
    let nameService: any = '';
    let amountServices: any = this.formAddService.value.amountServices;

    this.dataServices.map((res:any) => {
      if ((idService == res.id)) {
        codeService = res.cod;
        nameService = res.description;
      }
    })

    this.dataTypeServices.map((res:any) => {
      if ((idTypeService == res.id)) {
        nameTypeService = res.description;
      }
    })

    if ( this.formAddService.status == "VALID" ) {

          this.serviceCopago.addServices( codeService , idTypeService, nameTypeService, idService, nameService, amountServices)

          this.modalService.close();

    }

  }

  updateServices(e: Event) {

    let index = this.data3;

    e.preventDefault();

    if (this.formAddService.status == "VALID") {

      this.serviceCopago.updateServices(index);

    }

  }

}
