import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignVisitorDatesComponent } from 'src/app/intranet/dates-management/pages/assign-visitor-dates/assign-visitor-dates.component';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { all } from 'underscore';

@Component({
  selector: 'app-view-admin-requests',
  templateUrl: './view-admin-requests.component.html',
  styleUrls: ['./view-admin-requests.component.scss']
})
export class ViewAdminRequestsComponent implements OnInit {

  public countSolicitudes: any;

  public rejectRequest: any;

  public approveRequest: any;

  public unassignedRequest: any[];
  public allRequest: any[];
  public titleDataTable: any[];

  public userloggedRut: any;
  public userloggedRole: any;

  name!:string;


  constructor(
    private router: Router,
    public sortByService: SortByTablesService,
    private modalService : ModalsService,
    private loggedService: LoggedService,
    private date: DatesService,

  ) {

    this.userloggedRut = JSON.parse(window.sessionStorage.getItem("auth-user"));

    this.userloggedRole = JSON.parse(window.sessionStorage.getItem("rol-user"));

    this.countSolicitudes = 0;

    this.rejectRequest = 0;

    this.approveRequest = 0;

    this.unassignedRequest = [];

    this.allRequest = [];

    this.titleDataTable = [
      'Nro.', 'nro. solicitud', 'fecha de solicitud', 'rut vecino', 'nombres y apellidos', 'dirección', 'supervisor', 'estatus'
    ]
  }

  ngOnInit(): void {

    this.getAllRequest();

  }

  getAllRequest() {
    this.date.getAllRequest().subscribe( result => {

      let allRequest: any[] = [];

      this.unassignedRequest = result.data_complete;


      this.unassignedRequest.map((res: any, i: any) => {
        if (this.userloggedRole === 1) {
          res['displayStatus'] = res.status;
        }

        if (this.userloggedRole !== 1) {
          res['displayStatus'] = res.status_emp;
        }

        allRequest.push({
          'Nro.': i+1,
          'nro. solicitud': res.id_request,
          'fecha de solicitud': res.request_date,
          'rut vecino': res.rut_user,
          'nombres y apellidos': res.user_name + ' ' + res.user_lastname,
          'dirección': res.street + ' ' + res.way_number + ', ' + res.description + ' ' + (res.property_number ?? 's/n'),
          'supervisor': (res.supervisor_names ?? ' ') + ' ' + (res.supervisor_lastname ?? ' '),
          'estatus': res.displayStatus

        })

      })

      this.allRequest = allRequest;

      this.countSolicitudes = result.count_solicitudes['0']?.count;

      this.rejectRequest = result.reject_Request.length;

      this.approveRequest = result.approve_Request.length;

    })
  }

  viewDate (eventTable: any) {

    console.log(JSON.parse(eventTable));

    // this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }


  tableAction (eventTable: any) {

    let dataEvent = JSON.parse(eventTable);

    if(dataEvent.type === 'nd') this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : dataEvent.idRequest}});

  }

}
