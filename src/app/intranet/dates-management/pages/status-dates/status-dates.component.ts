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


  private idRequestSubscription: Subscription;

  public idRequest: any;

  constructor(
    private routerQuery: ActivatedRoute,
    private router: Router,
    private date: DatesService

  ) {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

  }

  ngOnInit(): void {

    this.requestForRut();

  }


  ngOnDestroy() {
    this.idRequestSubscription.unsubscribe();
  }

  requestForRut() {
    this.date.getForIdRequest();
  }

  return() {
    this.router.navigate(['/solicitud/solicitudes-de-inscripcion'])

  }

}
