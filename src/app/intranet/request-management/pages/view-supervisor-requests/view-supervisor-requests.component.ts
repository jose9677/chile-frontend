import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AssignVisitorDatesComponent } from 'src/app/intranet/dates-management/pages/assign-visitor-dates/assign-visitor-dates.component';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';
import { LoggedService } from 'src/app/shared/services/logged.service';


@Component({
  selector: 'app-view-supervisor-requests',
  templateUrl: './view-supervisor-requests.component.html',
  styleUrls: ['./view-supervisor-requests.component.scss']
})
export class ViewSupervisorRequestsComponent implements OnInit {

  public titleDataTable: any[];
  public titleDataTable2: any[];

  unassignedRequest: any[];
  unassignedRequest2: any[];

  public allRequestAssigned: any[];
  public allRequestUnassigned: any[];

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

    // this.userloggedRut = sessionStorage.getItem('auth-user');
    this.userloggedRut = JSON.parse(window.sessionStorage.getItem("auth-user"));
    this.userloggedRole = JSON.parse(window.sessionStorage.getItem("rol-user"));

    this.unassignedRequest = [];

    this.unassignedRequest2 = [];

    this.allRequestAssigned = [];
    this.allRequestUnassigned = [];

    this.titleDataTable = [
      'Nro.',
      'nro. solicitud',
      'fecha de solicitud',
      'rut vecino',
      'nombres y apellidos',
      'dirección',
      // 'supervisor',
      'estatus'
    ]

    this.titleDataTable2 = [
      'Nro.',
      'nro. solicitud',
      'fecha de solicitud',
      'rut vecino',
      'nombres y apellidos',
      'dirección',
      'asistente social',
      'estatus'
    ]


  }



  ngOnInit(): void {

    if(this.userloggedRole === 3) {

      const rutSupervisor= this.userloggedRut;

    }


    this.getAllRequest();
  }


  getAllRequest() {

    this.date.getAllRequest().subscribe( result => {
      let iu = 0;
      let ia = 0;

      console.log(result);
      let allRequestAssigned: any[] = [];
      let allRequestUnassigned: any[] = [];

      result.data_complete.map((res: any, i: any)=>{

        if (this.userloggedRole === 1) {
          res['displayStatus'] = res.status;
        }

        if (this.userloggedRole !== 1) {
          res['displayStatus'] = res.status_emp;
        }

        if (res.assistant_rut != null) {


          allRequestAssigned.push({
            'Nro.': ia = ia + 1,
            'nro. solicitud': res.id_request,
            'fecha de solicitud': res.request_date,
            'rut vecino': res.rut_user,
            'nombres y apellidos': res.user_name + ' ' + res.user_lastname,
            'dirección': res.street + ' ' + res.way_number + ', ' + res.description + ' ' + (res.property_number ?? 's/n'),
            'asistente social': (res.assistant_name ?? ' ') + ' ' + (res.assistant_lastname ?? ' '),
            'estatus': res.displayStatus
          })
          this.allRequestAssigned = allRequestAssigned;

          this.unassignedRequest2.push(res);

        }else{

          allRequestUnassigned.push({
            'Nro.': iu = iu + 1,
            'nro. solicitud': res.id_request,
            'fecha de solicitud': res.request_date,
            'rut vecino': res.rut_user,
            'nombres y apellidos': res.user_name + ' ' + res.user_lastname,
            'dirección': res.street + ' ' + res.way_number + ', ' + res.description + ' ' + (res.property_number ?? 's/n'),
            // 'supervisor': (res.supervisor_names ?? ' ') + ' ' + (res.supervisor_lastname ?? ' '),
            'estatus': res.displayStatus
          })
          this.allRequestUnassigned = allRequestUnassigned;
          this.unassignedRequest.push(res);
        }


      })


    })

  }

  assignSocialAssistant (nroRequest: any) {

    this.modalService.openModalData(AssignVisitorDatesComponent, nroRequest);

    this.getAllRequest();


  }

  editAssignSocialAssistant (id_request: any) {

    this.router.navigate(['citas/editar-asistente-social'],{queryParams: {id_request: id_request}})


  }

  viewDate (id_request: any) {

    this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }


  tableAction (eventTable: any) {

    let dataEvent = JSON.parse(eventTable);

    if(dataEvent.type === 'vd') this.viewDate(dataEvent.idRequest);

    if(dataEvent.type === 'av') this.assignSocialAssistant(dataEvent.idRequest);

    if(dataEvent.type === 'ev') this.editAssignSocialAssistant(dataEvent.idRequest);


  }


}


