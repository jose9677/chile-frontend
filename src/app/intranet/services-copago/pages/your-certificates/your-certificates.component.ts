import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulationsCopagoService } from '../../shared/services/simulations-copago.service';

@Component({
  selector: 'app-your-certificates',
  templateUrl: './your-certificates.component.html',
  styleUrls: ['./your-certificates.component.scss']
})
export class YourCertificatesComponent implements OnInit {

  public listSimulations: any[];


  constructor(
    private router: Router,
    private simulationServices: SimulationsCopagoService
  ) {

    this.listSimulations= [];

   }

  ngOnInit(): void {

    let rut_user: any= window.sessionStorage.getItem("auth-user");

    this.simulationServices.getRutSimulation(rut_user.replace(/["']/g, "")).subscribe(result => {
      result.map((res:any) => {
        this.listSimulations.push({
          "idSimulation" : res.id_simulation,
          "dateOfIssue" : res.emition_date,
          "dateOfDue" : res.expiration_date,
          "provider" : res.provider_description,
          "copago" : res.copago_value,
          "status" : res.status,
          "idStatus" : res.id_status
      })
      })

    })

  }

  viewCertificate(e: Event, idSimulation: any) {

    e.preventDefault();

    this.router.navigate(['copago', 'cobertura-de-salud'], {queryParams: {codeCertificate: idSimulation}});

  }

  downloadCertificate(e: Event) {

    e.preventDefault();

    alert('descargar certificado');
  }

}
