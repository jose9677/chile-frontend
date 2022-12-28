import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ServiceCopagoService } from '../../shared/services/service-copago.service';
import { CancelSimulationComponent } from '../cancel-simulation/cancel-simulation.component';

@Component({
  selector: 'app-copayment-simulator',
  templateUrl: './copayment-simulator.component.html',
  styleUrls: ['./copayment-simulator.component.scss']
})
export class CopaymentSimulatorComponent implements OnInit {

  public isFormSubmitted: boolean;

  public idSimulation: any;

  public dateOfIssue: any;

  public expirationDate: any;

  public rutNeighbor: any;

  public nameNeighbor: any;

  public status: any;

  public coveragePercentageIsapre: any;

  public coveragePercentageSupplementary: any;

  public listServiceProvider: any[];

  public selectedServiceProvider: any;

  public listServicesCopago: any[];

  public formCopago = this.fb.group({
    coveragePercentageIsapre: ["", []],
    coveragePercentageSupplementary: ["", []],
    serviceProvider: ["", []],
    services: this.fb.array([]),
    authCheck: ['', []]

  })

  constructor(
    private fb: FormBuilder,
    private modalService: ModalsService,
    private copagoService: ServiceCopagoService,
    private router: Router
  ) {

    this.listServiceProvider= [];

    this.isFormSubmitted = false;

    this.idSimulation = 11111111;

    this.dateOfIssue = "00/00/0000";

    this.expirationDate = "00/00/0000";

    this.rutNeighbor = "00000000-0";

    this.nameNeighbor = "Eduy Edgardo Omaña Hernnadez";

    this.status = "Pendiente";

    this.coveragePercentageIsapre ="Porcentaje de Cobertura";

    this.coveragePercentageSupplementary= "Porcentaje de Cobertura";

    this.listServiceProvider = [
      {"id": 1, "serviceProvider": "Fonasa" }
    ];

    this.selectedServiceProvider = null;
   }

  ngOnInit(): void {


  }

  get services() {
    return this.formCopago.controls["services"] as FormArray
  }


  generateCertificate(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    let error= false;
    let title= "Certificado Generado";
    let message = 'Se ha generado su certificado de Prestación de servicios de forma exitosa. el mismo sera descargado de forma automática en su computadora y podra visualizarlo en la opción "ver certificados" del menú lateral';
    this.modalService.OpenModalError2(ModalComponent, error, title, message);
    this.isFormSubmitted = true;

    this.router.navigate(['copago', 'sus-certificados'])

  }

  cancel (e: Event) {

    e.preventDefault();

    this.modalService.openModalData(CancelSimulationComponent, this.idSimulation);
    this.isFormSubmitted = true;

  }

}
