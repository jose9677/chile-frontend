import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatesService } from '../../shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { VisitorDataComponent } from '../visitor-data/visitor-data.component';
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
    private dateService: DatesService,
    private modalService: ModalsService,

  ) {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.unassignedRequest = [];





  }

  ngOnInit(): void {

    this.dateService.getForIdRequest(this.idRequest).subscribe((result) => {
      console.log(result)


      result.map((res: any)=>{
        res.fullName = res.names_assistant +' '+ res.lastname_assistant;
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +'-'+ res.prevention_detail;
        res.fullDirection = res.street + ' ' + res.way_number + ', ' + res.description + ' ' + res.property_number;

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

  visitador(){
    this.modalService.openModal(VisitorDataComponent)
  }

}
