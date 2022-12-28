import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-coverage',
  templateUrl: './health-coverage.component.html',
  styleUrls: ['./health-coverage.component.scss']
})
export class HealthCoverageComponent implements OnInit {

  public idSimulation: any;

  public dateOfIssue: any;

  public expirationDate: any;

  public rutNeighbor: any;

  public nameNeighbor: any;

  public status: any;

  public coveragePercentageIsapre: any;

  public coveragePercentageSupplementary: any;

  public serviceProvider: any;

  public listServicesCopago:any[];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  printCertificate( e: Event ) {
    alert('imprimir certificado');

  }

  cancel( e: Event ) {
    this.router.navigate(['copago', 'sus-certificados'])
  }

}
