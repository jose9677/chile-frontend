import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimulationsCopagoService } from '../../shared/services/simulations-copago.service';

@Component({
  selector: 'app-health-coverage',
  templateUrl: './health-coverage.component.html',
  styleUrls: ['./health-coverage.component.scss']
})
export class HealthCoverageComponent implements OnInit {


  private idSimulationSubscription: Subscription;

  public idSimulation: any;

  public dateOfIssue: any;

  public expirationDate: any;

  public rutNeighbor: any;

  public nameNeighbor: any;

  public status: any;

  public coveragePercentageIsapre: any;

  public coveragePercentageSupplementary: any;

  public serviceProvider: any;

  public selectedServiceProvider: any;

  public subTotal: any;

  public coveragePrevision: any;

  public coverageSupplementaryInsurance: any;

  public totalCopago: any;

  public listServicesCopago:any[];

  constructor(
    private router: Router,
    private simulationServices: SimulationsCopagoService,
    private routerquery: ActivatedRoute,

  ) {

    this.listServicesCopago = [];

  }

  ngOnInit(): void {

    this.idSimulationSubscription = this.routerquery.queryParams.subscribe(id => this.idSimulation = id.codeCertificate);

    this.simulationServices.getDataSimulation(this.idSimulation).subscribe(result => {

      result.map((res:any) => {


        this.dateOfIssue = res.emition_date;

        this.expirationDate = res.expiration_date;

        this.rutNeighbor = res.rut_user;

        this.nameNeighbor = res.names + ' ' + res.lastname;

        this.status = res.status;

        this.coveragePercentageIsapre = res.percent_prevition;

        this.coveragePercentageSupplementary= res.percent_sec_comp;

        this.selectedServiceProvider = res.provider_description;


        this.listServicesCopago.push({"code": res.services_cod, "typeService": res.category_description, "nameService": res.service_description, "amountServices": res.quantity,"total": (res.total_value*res.quantity)});

      })
    })

    let rut_user: any= window.sessionStorage.getItem("auth-user");

    this.simulationServices.calcCopago(this.idSimulation).subscribe(result => {

      console.log(result)

      this.subTotal = result.SubTotal;

      this.coveragePrevision = result.Cobert_Prevition;

      this.coverageSupplementaryInsurance = result.Secure_Comp;

      this.totalCopago = result.Copago;

    })

  }

  printCertificate( e: Event ) {
    alert('imprimir certificado');

  }

  cancel( e: Event ) {
    this.router.navigate(['copago', 'sus-certificados'])
  }

  ngOnDestroy() {
    this.idSimulationSubscription.unsubscribe();
  }

}
