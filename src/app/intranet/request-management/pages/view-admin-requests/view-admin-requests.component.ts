import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignVisitorDatesComponent } from 'src/app/intranet/dates-management/pages/assign-visitor-dates/assign-visitor-dates.component';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';
import { LoggedService } from 'src/app/shared/services/logged.service';

@Component({
  selector: 'app-view-admin-requests',
  templateUrl: './view-admin-requests.component.html',
  styleUrls: ['./view-admin-requests.component.scss']
})
export class ViewAdminRequestsComponent implements OnInit {

  countSolicitudes: any;

  rejectRequest: any;

  approveRequest: any;

  unassignedRequest: any[];

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



  }

  ngOnInit(): void {

    this.getAllRequest();

  }

  getAllRequest() {
    this.date.getAllRequest().subscribe( result => {

      console.log(result);

      this.unassignedRequest = result.data_complete;

      this.unassignedRequest.map((res) => {
        if (this.userloggedRole === 1) {
          res['displayStatus'] = res.status;
        }

        if (this.userloggedRole !== 1) {
          res['displayStatus'] = res.status_emp;
        }
      })



      this.countSolicitudes = result.count_solicitudes['0']?.count;

      this.rejectRequest = result.reject_Request.length;

      this.approveRequest = result.approve_Request.length;

    })
  }

  viewDate (id_request: any) {

    this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }

}
