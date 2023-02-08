import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';
import { SimulationsCopagoService } from '../../shared/services/simulations-copago.service';
import { AddServicesComponent } from '../add-services/add-services.component';

@Component({
  selector: 'app-simulation-data',
  templateUrl: './simulation-data.component.html',
  styleUrls: ['./simulation-data.component.scss']
})
export class SimulationDataComponent implements OnInit {

  private isLoadServices: boolean;

  public isFormSubmitted: boolean;

  public addServices: boolean;

  public rutNeighbor: any;

  public nameNeighbor: any;

  public coveragePercentage: any;

  public coveragePercentageSupplementary: any;

  public listServiceProvider: any[];

  public selectedServiceProvider: any;


  public preventionType: any;

  public supplementary : boolean;

  public idSimulation: any;

  public listServicesCopago: any[];

  public formCopago = this.fb.group({
    coveragePercentage: ["0", []],
    coveragePercentageSupplementary: ["0", []],
    serviceProvider: ["", [ Validators.required]],
    services: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private modalService: ModalsService,
    private copagoServices: ServiceCopagoService,
    private simulationServices: SimulationsCopagoService,
    private router: Router,
    private loggedService: LoggedService
  ) {

    this.idSimulation = 0;

    this.listServiceProvider= [];

    this.isLoadServices = false;

    this.isFormSubmitted = false;

    this.addServices = false;

    this.preventionType = 1;

    this.supplementary = false;

    this.listServicesCopago = [];

    this.selectedServiceProvider = null;
   }

  ngOnInit(): void {


    this.copagoServices.resetDataServices();

    this.rutNeighbor = sessionStorage.getItem('auth-user');
    this.rutNeighbor = this.rutNeighbor.replace(/["']/g, "")

    this.copagoServices.getDataUser(this.rutNeighbor).subscribe(result => {

      console.log(result)

      result.data_user.map((res: any) => {

        this.nameNeighbor = res.names + ' ' + res.lastname;

        this.preventionType = res.id_prevention_type;

        this.supplementary = res.assurance;

      })

      result.providers.map((res:any) => {
        let listServiceProvider: any[] = []

        listServiceProvider.push({"id": res.id_provider, "serviceProvider": res.description});

        this.listServiceProvider = listServiceProvider;
      })


    },
    error => {

    },
    () => {

    })


  }

  ngAfterViewInit() {

    this.listServicesCopago= this.copagoServices.getSetvices();

  }

  get services() {
    return this.formCopago.controls["services"] as FormArray
  }

  addService(e: Event) {

    e.preventDefault();

    this.addServices = true;

    if ( this.formCopago.value.serviceProvider != null) {

      this.modalService.openModalData(AddServicesComponent, this.formCopago.controls.serviceProvider.value)

      this.listServicesCopago= this.copagoServices.getSetvices();

    } else {

    }

  }

  generateCopaymentSimulator(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    if ((this.listServicesCopago.length != 0)) {

      let rutUser: any = this.rutNeighbor;

      let dataServices = {
      "percent_prevition": this.formCopago.value.coveragePercentage,
      "percent_sec_comp": this.formCopago.value.coveragePercentageSupplementary,
      }

      this.addSimulation( rutUser, dataServices);

    }

  }

  addSimulation( rutUser: any, dataSimulation: any) {

    let idSimulation: any = "";

    this.simulationServices.addSimulation(rutUser, dataSimulation).subscribe((res) => {

      idSimulation = res.id_simulation;


    },
    error => {

    this.isFormSubmitted = false;


    },
    () => {

      this.addServicesSimulation(idSimulation);

      // this.router.navigate(['copago/simulador-de-copago'], {queryParams: {id_simulation: idSimulation}});

    })

  }

  addServicesSimulation(idSimulation:any) {

    let countArray: any = []

    this.listServicesCopago.map((res: any) => {

      const dataServices: any = {
        "id_simulation": idSimulation,
        "cod": res.codeService,
        "quantity": res.amountServices
      }

      this.simulationServices.addServicesSimulation( dataServices ).subscribe((res) => {


      },
      error => {
        this.isFormSubmitted = false;

      },
      () => {

        countArray.push({"num": 1});

        if(this.listServicesCopago.length == countArray.length) {

          this.router.navigate(['copago/simulador-de-copago'], {queryParams: {id_simulation: idSimulation}});

        }
      })

    })
  }

  cancel (e: Event) {

    e.preventDefault();

    this.copagoServices.resetDataServices();

    this.router.navigate(['solicitud/solicitudes-de-inscripcion']);

  }

  deleteService( e: Event, i: any ) {
    e.preventDefault();

    this.listServicesCopago.splice(i, 1);

  }

  editService( e: Event , dataServiceUser: any, i: any) {

    e.preventDefault();

    this.modalService.openModalData3(AddServicesComponent, this.formCopago.controls.serviceProvider.value, dataServiceUser, i);

  }



}
