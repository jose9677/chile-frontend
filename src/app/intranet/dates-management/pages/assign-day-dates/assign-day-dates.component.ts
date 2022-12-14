import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { DatesService } from '../../shared/services/dates.service';

@Component({
  selector: 'app-assign-day-dates',
  templateUrl: './assign-day-dates.component.html',
  styleUrls: ['./assign-day-dates.component.scss']
})
export class AssignDayDatesComponent implements OnInit {

  public isFormSubmitted: boolean;

  public dataRequest: any[]

  public errors: any = null;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  public today: any;

  private idStatus: any;




  formProgramVisitDate: any = this.fb.group ({
    dateVisit: ['', [Validators.required]],

  })


  constructor(
    private datesService: DatesService,
    private fb: FormBuilder,
    private routerQuery: ActivatedRoute,
    private modalService: ModalsService
  ) {
    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.dataRequest = [];

    this.idStatus = '',

    this.today = new Date()
    this.today = `${this.today.getFullYear()}-${(this.today.getMonth())+1}-${this.today.getDate()}`
    console.log(this.today)


    

   }

  ngOnInit(): void {
    this.isFormSubmitted = false   

    
    this.datesService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)
      
      result.map((res: any) => {
        res.fullName = res.names_assistant +' '+ res.lastname_assistant;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail;
        res.fullDirection = res.street + ' ' + res.way_number + ', ' + res.description + ' ' + res.property_number;        
        
        this.dataRequest.push(res);

        this.idStatus = res.id_status

      });      
                  
    },
    error => {
      
    },
    () => {
      
      if ( this.idStatus == 5 ) {
        let error = false;
        let title= "";
        let message = "Por favor póngase en contacto con el vecino para coordinar una fecha y hora de visita de mutuo acuerdo, puesto que una vez reagendada la cita, la misma queda automáticamente confirmada sin interacción del vecino";
        this.modalService.OpenModalError2(ModalComponent, error, title, message);
      }
      
    })


   

   

  }


  programVisitDate() {

    this.isFormSubmitted = true;
    const date = this.formProgramVisitDate.controls.dateVisit.value;

    const dateVisit = {
      "visit_date": date
    }

    if ( this.isFormSubmitted && !this.formProgramVisitDate.controls.dateVisit.errors ) {

      console.log(dateVisit)

      this.datesService.programVisitDate(this.idRequest, dateVisit).subscribe((result) => {

        console.log(result);

      },
      error => {

      },
      () => {

        let error = false;
        let title= "Cita Asignada Exitosamente";
        let message = "La cita fue asignada de forma exitosa";
        this.modalService.OpenModalError2(ModalComponent, error, title, message);

      })

    } else {

    }

  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

}
