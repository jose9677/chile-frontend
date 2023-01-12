import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    public router: Router
  ) {

    this.isFormSubmitted = false;

    this.listReasonForCancellation = [
      {"idReason": 1, "reasonForCancellation": "Motivo de rechazo de solicitud"}
    ];

    this.selectedReasonForCancellation = null;

  }

  ngOnInit(): void {

    this.idSimulation = this.data;
  }

  acceptCancellationCopago(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    if (( this.formCancelCopago.status == 'VALID' )) {

      // endpoint para cancelar simulación
      this.modalService.close();
      this.router.navigate(['copago','datos-de-simulacion']);

    }

  }

}
