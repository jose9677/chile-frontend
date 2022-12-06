import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatesService } from '../../shared/services/dates.service';

@Component({
  selector: 'app-status-dates',
  templateUrl: './status-dates.component.html',
  styleUrls: ['./status-dates.component.scss']
})
export class StatusDatesComponent implements OnInit {

  public errors: any = null;

  private idRequestSubscription: Subscription;

  public idRequest: any;

  private dataRequest: any;

  public unassignedRequest: any[];



  constructor(
    private routerQuery: ActivatedRoute,
    private router: Router,
    private dateService: DatesService

  ) {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.unassignedRequest = [];





  }

  ngOnInit(): void {

    this.dateService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)


      result.map((res: any)=>{
        res.fullName = res.employee_name +' '+ res.employee_lastname;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' Tipo: '+ res.prevention_detail;
        res.fullDirection = res.way_number + 'faltan';

        this.unassignedRequest.push(res);
      })
      console.log(this.unassignedRequest)


    },
    error => {

      this.errors = true;



    },
    () => {


    });
  }

  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }


  return() {
    this.router.navigate(['/solicitud/solicitudes-de-inscripcion'])

  }

}
