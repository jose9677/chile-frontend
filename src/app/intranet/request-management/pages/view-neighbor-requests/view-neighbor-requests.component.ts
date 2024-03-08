import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';
import { LoggedService } from 'src/app/shared/services/logged.service';

@Component({
  selector: 'app-view-neighbor-requests',
  templateUrl: './view-neighbor-requests.component.html',
  styleUrls: ['./view-neighbor-requests.component.scss']
})
export class ViewNeighborRequestsComponent implements OnInit {

  private rutNeighbor: any;

  private userloggedRole: any;

  public errors: any = null;

  unassignedRequest: any[];

  private dataRequest: any;

  public titleDataTable: any[];

  public dataDataTable: any[];


  constructor(
    private router: Router,
    public sortByService : SortByTablesService,
    private modal : ModalsService,
    private loggedService: LoggedService,
    private date: DatesService,



  ) {

    this.titleDataTable = [
      'Nro.',
      'nro. solicitud',
      'fecha solicitud',
      'tipo previsión',
      'fecha de visita',
      'estatus'
    ];

    this.dataDataTable = [];

    this.unassignedRequest = [];

  }

  ngOnInit(): void {

     this.rutNeighbor = JSON.parse(window.sessionStorage.getItem("auth-user"));
     this.userloggedRole = JSON.parse(window.sessionStorage.getItem("rol-user"));


    this.getForRut();

  }

  getForRut() {

    let requestForUser: any[] = [];

    this.date.getForRut(this.rutNeighbor).subscribe( result => {

      console.log(result);

      let lastRequest = (result.sort((a, b) => b.id_request - a.id_request)).slice(0,1);

      let statusLastRequest = lastRequest[0].id_status;

      let isExpiredRequest = [7, 9, 14].includes(statusLastRequest);

      sessionStorage.setItem('isExpiredRequest', isExpiredRequest.toString());

      result.map((res: any, i: any)=>{

        res.fullName = (res.assistant_names ?? ' ') +' '+ (res.assistant_lastname ?? ' ')
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail

        if (this.userloggedRole === 1) {
          res['displayStatus'] = res.status;
          res['idDisplayStatus'] = res.id_status;
        }

        if (this.userloggedRole !== 1) {
          res['displayStatus'] = res.status_emp;
          res['idDisplayStatus'] = res.id_status_emp;
        }

        // window.sessionStorage.setItem("status-request", JSON.stringify(res.id_status));

        requestForUser.push({
          'Nro.': i+1,
          'nro. solicitud': res.id_request,
          'fecha solicitud': res.request_date,
          'tipo previsión': res.fullPeventionData,
          'fecha de visita': res.visit_date,
          'estatus': res.displayStatus,
          'idEstatus': res.idDisplayStatus
        })

      })

      this.unassignedRequest = result;

      console.log(requestForUser);
    },
    error => {

      this.errors = true;
      // let title= "Registro Invalido";
      // let message = "No se pudo realizar el registro del Usuario";
      // this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      // this.isFormSubmitted = true;

    },
    () => {

      this.dataDataTable = requestForUser;

    });
  }

  viewDate (id_request: any) {

    this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }

  confirmDate (id_request: any) {

    this.router.navigate(['citas/confirmar-cita'], {queryParams: {id_request: id_request}});

  }

  confirmRenovation (id_request: any) {

    this.router.navigate(['citas/confirmar-renovacion'], {queryParams: {id_renovation: id_request}});

  }

  createDate (e: Event) {

    if (e !== null) e.preventDefault();

    this.router.navigate(['citas/crear-cita'], {queryParams: {rut_user: this.rutNeighbor}});

  }


  tableAction (eventTable: any) {

    let dataEvent = JSON.parse(eventTable);

    if(dataEvent.type === 'vd') this.viewDate(dataEvent.idRequest);
    if(dataEvent.type === 'nd') this.createDate(null);
    if(dataEvent.type === 'cd') this.confirmDate(dataEvent.idRequest);
    if(dataEvent.type === 'cr') this.confirmRenovation(dataEvent.idRequest);

  }



}
