import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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




  formProgramVisitDate: any = this.fb.group ({
    dateVisit: ['', [Validators.required]],

  })


  constructor(
    private datesService: DatesService,
    private fb: FormBuilder,
    private routerQuery: ActivatedRoute
  ) {
    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.dataRequest = [];

   }

  ngOnInit(): void {
    this.isFormSubmitted = false

    this.datesService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)

      result.map((res: any) => {
        res.fullName = res.names_assistant +' '+ res.lastname_assistant;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +'-'+ res.prevention_detail;
        res.fullDirection = res.street + ' ' + res.way_number + ', ' + res.description + ' ' + res.property_number;

        this.dataRequest.push(res);
      });

    },
    error => {

    },
    () => {

    })
  }


  programVisitDate() {

    this.isFormSubmitted = true;
    const date = this.formProgramVisitDate.controls.dateVisit.value;



    const dateVisit = {
      "visit_date": date 
    }

    console.log(dateVisit)

    this.datesService.programVisitDate(this.idRequest, dateVisit).subscribe((result) => {

      console.log(result)

    },
    error => {

    },
    () => {

    })
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

}
