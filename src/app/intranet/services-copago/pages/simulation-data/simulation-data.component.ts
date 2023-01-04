import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';
import { AddServicesComponent } from '../add-services/add-services.component';

@Component({
  selector: 'app-simulation-data',
  templateUrl: './simulation-data.component.html',
  styleUrls: ['./simulation-data.component.scss']
})
export class SimulationDataComponent implements OnInit {

  public isFormSubmitted: boolean;

  // public idSimulation: any;

  // public dateOfIssue: any;

  // public expirationDate: any;

  public rutNeighbor: any;

  public nameNeighbor: any;

  // public status: any;

  public coveragePercentageIsapre: any;

  public coveragePercentageSupplementary: any;

  public listServiceProvider: any[];

  public selectedServiceProvider: any;

  public listServicesCopago: any[];

  public formCopago = this.fb.group({
    coveragePercentageIsapre: ["0", []],
    coveragePercentageSupplementary: ["0", []],
    serviceProvider: ["", [ Validators.required]],
    services: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private modalService: ModalsService,
    private copagoServices: ServiceCopagoService,
    private router: Router,
    private loggedService: LoggedService
  ) {

    this.listServiceProvider= [];

    this.isFormSubmitted = false;

    // this.idSimulation = 11111111;

    // this.dateOfIssue = "00/00/0000";

    // this.expirationDate = "00/00/0000";

    // this.rutNeighbor = "00000000-0";

    // this.nameNeighbor = "Eduy Edgardo Omaña Hernadez";

    // this.status = "Pendiente";

    this.coveragePercentageIsapre ="Porcentaje de Cobertura";

    this.coveragePercentageSupplementary= "Porcentaje de Cobertura";

    this.listServiceProvider = [
      {"id": 1, "serviceProvider": "Fonasa" }
    ];

    this.selectedServiceProvider = null;
   }

  ngOnInit(): void {

    this.rutNeighbor = sessionStorage.getItem('auth-user');
    this.rutNeighbor = this.rutNeighbor.replace(/["']/g, "")

    console.log(this.rutNeighbor)

    this.copagoServices.getDataUser(this.rutNeighbor).subscribe(result => {
      console.log(result);
      result.map((res: any) => {
        this.nameNeighbor = res.names + ' ' + res.lastname
      })
    },
    error => {

    },
    () => {

    })



  }

  get services() {
    return this.formCopago.controls["services"] as FormArray
  }

  addService() {
    this.modalService.openModal(AddServicesComponent)

    this.listServicesCopago= this.copagoServices.getSetvices();

  }

  generateCopaymentSimulator(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    this.router.navigate(['copago/simulador-de-copago'])

  }

  cancel (e: Event) {

    e.preventDefault();

    this.router.navigate(['solicitud/solicitudes-de-inscripcion'])

  }

  deleteService( e: Event ) {
    e.preventDefault();

    alert('eliminar servicio');

  }

  editService( e: Event ) {

    alert('editar servicio');

  }

}
