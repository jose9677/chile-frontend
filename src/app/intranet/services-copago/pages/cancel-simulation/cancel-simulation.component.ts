import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/public/auth/shared/services/auth.service';
import { SimulationsCopagoService } from '../../shared/services/simulations-copago.service';

@Component({
  selector: 'app-cancel-simulation',
  templateUrl: './cancel-simulation.component.html',
  styleUrls: ['./cancel-simulation.component.scss']
})
export class CancelSimulationComponent implements OnInit {

  @Input () data: any;

  public idSimulation: any;

  public isFormSubmitted: boolean;

  public listReasonForCancellation: any[];

  public selectedReasonForCancellation: any;

  public formCancelCopago = this.fb.group ({
    reasonForCancellation: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    public modalService: NgbActiveModal,
    public router: Router,
    private dataMotive: AuthService,
    private simulationService: SimulationsCopagoService
  ) {

    this.isFormSubmitted = false;

    this.listReasonForCancellation = [
      {"id_motive": 1, "description": "Motivo de rechazo de solicitud"}
    ];

    this.selectedReasonForCancellation = null;

  }

  ngOnInit(): void {

    this.idSimulation = this.data;

    this.getMotivesCancel();
  }


  getMotivesCancel () {
    this.dataMotive.dropdownInfo().subscribe(result => {
      this.listReasonForCancellation = result.cancel_motives
    })
  }

  acceptCancellationCopago(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    if (( this.formCancelCopago.status == 'VALID' )) {

      this.simulationService.cancelSimulation(this.idSimulation, this.formCancelCopago.value.reasonForCancellation).subscribe( result => {

      },
      error => {

      },
      () => {

        // endpoint para cancelar simulación
        this.modalService.close();
        this.router.navigate(['copago','datos-de-simulacion']);

      })


    }

  }

}
