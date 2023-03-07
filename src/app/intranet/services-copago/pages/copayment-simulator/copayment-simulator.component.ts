import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';
import { SimulationsCopagoService } from '../../shared/services/simulations-copago.service';
import { CancelSimulationComponent } from '../cancel-simulation/cancel-simulation.component';

@Component({
  selector: 'app-copayment-simulator',
  templateUrl: './copayment-simulator.component.html',
  styleUrls: ['./copayment-simulator.component.scss']
})
export class CopaymentSimulatorComponent implements OnInit {

  private idSimulationSubscription: Subscription;


  public isFormSubmitted: boolean;

  public idSimulation: any;

  public dateOfIssue: any;

  public expirationDate: any;

  public rutNeighbor: any;

  public nameNeighbor: any;

  public status: any;

  public coveragePercentagePrevention: any;

  public coveragePercentageSupplementary: any;

  public listServiceProvider: any[];

  public selectedServiceProvider: any;

  public listServicesCopago: any[];

  public subTotal: any;

  public subTotal2: any;

  public coveragePrevision: any;

  public coverageSupplementaryInsurance: any;

  public corporateDiscount: any;

  public totalCopago: any;

  public assurance: boolean;

  public idPreventionType: any;

  public descriptionPreventionType: any;

  public formCopago = this.fb.group({
    coveragePercentageIsapre: ["", []],
    coveragePercentageSupplementary: ["", []],
    serviceProvider: ["", []],
    services: this.fb.array([]),
    authCheck: ['', [ Validators.required]]

  })

  constructor(
    private fb: FormBuilder,
    private modalService: ModalsService,
    private copagoService: ServiceCopagoService,
    private router: Router,
    private routerquery: ActivatedRoute,
    private simulationServices: SimulationsCopagoService

  ) {


    this.isFormSubmitted = false;

    this.listServicesCopago = [];

    this.listServiceProvider = [];

    this.assurance = false;

    this.idPreventionType = '';

    this.descriptionPreventionType = '';

   }

  ngOnInit(): void {

    this.idSimulationSubscription = this.routerquery.queryParams.subscribe(id => this.idSimulation = id.id_simulation);

    let listServicesCopago: any[] = [];

    this.simulationServices.getDataSimulation(this.idSimulation).subscribe(result => {

      console.log(result)


      result.map((res:any) => {

        this.dateOfIssue = res.emition_date;

        this.expirationDate = res.expiration_date;

        this.rutNeighbor = res.rut_user;

        this.nameNeighbor = res.names + ' ' + res.lastname;

        this.status = res.status;

        this.coveragePercentagePrevention = res.percent_prevition;

        this.coveragePercentageSupplementary= res.percent_sec_comp;

        this.selectedServiceProvider = res.provider_description;


        listServicesCopago.push({"code": res.services_cod, "typeService": res.category_description, "nameService": res.service_description, "amountServices": res.quantity,"total": (res.total_value*res.quantity)});

      })
    },
    error => {


    },
    () => {
      this.listServicesCopago = listServicesCopago;

      this.copagoService.getDataUser(this.rutNeighbor).subscribe( result => {

        result.data_user.map((res:any) => {

          this.assurance = res.assurance;
          this.idPreventionType = res.id_prevention_type;
          this.descriptionPreventionType = res.prevention_type;
        })

    } )


    })


  }

  ngAfterViewInit() {

    let rut_user: any= window.sessionStorage.getItem("auth-user");

    this.simulationServices.calcCopago(this.idSimulation).subscribe(result => {

      console.log(result)

      this.subTotal = result.SubTotal;

      this.subTotal2 = result.Balance_2;

      this.coveragePrevision = result.Cobert_Prevition;

      this.coverageSupplementaryInsurance = result.Secure_Comp;

      this.corporateDiscount = result.Desc_Corporation

      this.totalCopago = result.Copago;

    })


  }
  get services() {
    return this.formCopago.controls["services"] as FormArray
  }


  // generateCertificate(e: Event) {

  //   e.preventDefault();

  //   this.isFormSubmitted = true;

  //   if (this.formCopago.status == "VALID") {

  //     this.simulationServices.generateSimulation(this.idSimulation).subscribe(result => {

  //     },
  //     error => {

  //     },
  //     () => {

  //       let error= false;
  //       let title= "Certificado Generado";
  //       let message = 'Se ha generado su certificado de Prestación de servicios de forma exitosa. el mismo sera descargado de forma automática en su computadora y podra visualizarlo en la opción "ver certificados" del menú lateral';
  //       this.modalService.OpenModalError2(ModalComponent, error, title, message);

  //       this.router.navigate(['copago', 'sus-certificados'])

  //     })


  //   }


  // }

  aceptSimulation(e: Event) {

    e.preventDefault();

    let error= false;
    let title= "Simulación de Copago Realizada";
    let message = 'Se ha realizado la simulación de Copago de forma exitosa';
    this.modalService.OpenModalError2(ModalComponent, error, title, message);

    this.router.navigate([ 'copago', 'sus-certificados'])

  }

  cancel (e: Event) {

    e.preventDefault();

    this.modalService.openModalData(CancelSimulationComponent, this.idSimulation);
    this.isFormSubmitted = true;

  }

  ngOnDestroy() {
    this.idSimulationSubscription.unsubscribe();
  }

}
