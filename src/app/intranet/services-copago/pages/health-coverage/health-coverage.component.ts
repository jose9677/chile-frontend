import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';
import { SimulationsCopagoService } from '../../shared/services/simulations-copago.service';
import { PDFMAKERService } from 'src/app/shared/services/pdfmaker.service';


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

  public idStatus: any;

  public coveragePercentage: any;

  public coveragePercentageSupplementary: any;

  public serviceProvider: any;

  public selectedServiceProvider: any;

  public subTotal: any;

  public subtotal2: any;

  public corporateDiscount: any;

  public coveragePrevision: any;

  public coverageSupplementaryInsurance: any;

  public totalCopago: any;

  public listServicesCopago:any[];

  public assurance: boolean;

  public idPreventionType: any;

  public descriptionPreventionType: any;

  constructor(
    private router: Router,
    private simulationServices: SimulationsCopagoService,
    private routerquery: ActivatedRoute,
    private copagoService: ServiceCopagoService,
    private pdf: PDFMAKERService

  ) {

    this.listServicesCopago = [];

    this.assurance = false;

    this.idPreventionType= '';

    this.descriptionPreventionType = '';

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

        this.idStatus = res.id_status;

        this.coveragePercentage = res.percent_prevition;

        this.coveragePercentageSupplementary= res.percent_sec_comp;

        this.selectedServiceProvider = res.provider_description;


        this.listServicesCopago.push({"code": res.services_cod, "typeService": res.category_description, "nameService": res.service_description, "amountServices": res.quantity,"total": (res.total_value*res.quantity)});

      })
    },
    error => {

    },
    () => {

      this.getDataUser();

    })

    // let rut_user: any= window.sessionStorage.getItem("auth-user");

    this.simulationServices.calcCopago(this.idSimulation).subscribe(result => {

      this.subTotal = result.SubTotal;

      this.subtotal2 = result.Balance_2;

      this.corporateDiscount = result.Desc_Corporation

      this.coveragePrevision = result.Cobert_Prevition;

      this.coverageSupplementaryInsurance = result.Secure_Comp;

      this.totalCopago = result.Copago;

    },
    error => {

    },
    () => {

    })

  }

  getDataUser() {
    this.copagoService.getDataUser(this.rutNeighbor).subscribe( result => {

      result.data_user.map((res:any) => {

        this.assurance = res.assurance;
        this.idPreventionType = res.id_prevention_type;
        this.descriptionPreventionType = res.prevention_type;
      })
    })
  }

  // printCertificate( e: Event ) {
  //   this.simulationServices.PDFCertificates(this.idSimulation).subscribe(result => {
  //     this.pdf.pdftext(result[0].names+' '+result[0].lastname,result[0].rut_user,result[0].prevention_type+' '+result[0].prevention_detail);
  //   })

  // }

  cancel( e: Event ) {
    this.router.navigate(['copago', 'sus-certificados'])
  }

  ngOnDestroy() {
    this.idSimulationSubscription.unsubscribe();
  }

}
