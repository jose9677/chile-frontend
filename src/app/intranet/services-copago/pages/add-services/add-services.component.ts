import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddServicesComponent implements OnInit {

  public listServicesCopago: any[];

  public listTypesService : any[];

  public selectedTypeService: any;

  public listServices: any[];

  public selectedServices: any;

  public formAddService = this.fb.group({
    typeService: ["", []],
    nameService: ["", []],
    amountServices: ["", []]

  })

  constructor(
    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    public serviceCopago: ServiceCopagoService
  ) {

    this.listServicesCopago = [];

    this.listTypesService = [
      {
        "id": 1,
        "typeService": "laboratorio"
      },
      {
        "id": 2,
        "typeService": "laboratorio II"
      }
    ];

    this.selectedTypeService = null;

    this.listServices = [
      {
        "id": 1,
        "nameService": "Perfil Hepático"
      },
      {
        "id": 2,
        "nameService": "Perfil Hepático II"
      }
    ];

    this.selectedServices= null;
  }

  ngOnInit(): void {
  }

  addServices(e: Event) {

    console.log(this.formAddService);

    this.serviceCopago.addServices(this.formAddService.value.typeService, this.formAddService.value.nameService, this.formAddService.value.amountServices)

    this.listServicesCopago.push({ "typeService": this.formAddService.value.typeService, "nameService": this.formAddService.value.nameService, "amountServices": this.formAddService.value.amountServices})

    console.log(this.listServicesCopago)

  }

}
