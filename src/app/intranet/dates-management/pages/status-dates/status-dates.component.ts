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

  public unassignedRequest: any[];

  public documentsPre: any[];

  public documentsDom: any[];



  constructor(
    private routerQuery: ActivatedRoute,
    private router: Router,
    private dateService: DatesService,
    private modalService: ModalsService,

  ) {

    this.documentsDom = [];

    this.documentsPre = [];


    this.unassignedRequest = [];

  }

  ngOnInit(): void {

    this.idRequestSubscription = this.routerQuery.queryParams.subscribe(idRequest => this.idRequest = idRequest.id_request);

    this.dateService.getForIdRequest(this.idRequest).subscribe((result) => {
      


      result.map((res: any)=>{
        res.fullName = (res.names_assistant ?? '') +' '+ (res.lastname_assistant ?? '');
        res.fullNameUser = res.names +' '+ res.lastname;
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail;
        res.fullDirection = res.street + ' ' + res.way_number + ', ' + res.description + ' ' + ((res.property_number ?? 's/n') ?? 's/n');

        this.unassignedRequest.push(res);

        if ( res.id_document_type === 1 ) {
          this.documentsDom.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext});

        }
        else if ( res.id_document_type === 2 ) {
          this.documentsPre.push({'doc_srv_path': res.doc_srv_path, 'document_type': res.document_type, 'document_path': res.document_path, 'document_ext': res.document_ext})
        }
      })


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
    this.modalService.openModalData(VisitorDataComponent, this.unassignedRequest[0]?.rut_assistant)
  }

}
