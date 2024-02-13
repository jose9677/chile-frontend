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


  unassignedRequest: any[];
  unassignedRequest2: any[];

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
    this.userloggedRut = this.loggedService.rutUserValue();
    this.userloggedRole = this.loggedService.roleUserValue();

    this.unassignedRequest = [];

    this.unassignedRequest2 = [];


  }



  ngOnInit(): void {

    if(this.userloggedRole === 3) {

      const rutSupervisor= this.userloggedRut;

    }


    this.getAllRequest();
  }


  getAllRequest() {

    this.date.getAllRequest().subscribe( result => {

      console.log(result);


      result.data_complete.map((res: any)=>{

        if (this.userloggedRole === 1) {
          res['displayStatus'] = res.status;
        }

        if (this.userloggedRole !== 1) {
          res['displayStatus'] = res.status_emp;
        }

        if (res.assistant_rut != null) {
          this.unassignedRequest2.push(res);
        }else{
          this.unassignedRequest.push(res);
        }
      })
    })

  }

  assingSocialAssistant (nroRequest: any, visitorRut: any) {

    this.modalService.openModalData2(AssignVisitorDatesComponent, nroRequest, visitorRut);

    this.getAllRequest();


  }

  editAssingSocialAssistant (id_request: any) {

    this.router.navigate(['citas/editar-asistente-social'],{queryParams: {id_request: id_request}})


  }

  viewDate (id_request: any) {

    this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }


}


