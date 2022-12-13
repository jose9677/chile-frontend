import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignVisitorDatesComponent } from 'src/app/intranet/dates-management/pages/assign-visitor-dates/assign-visitor-dates.component';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';

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

  name!:string;


  constructor(
    private router: Router,
    public sortByService: SortByTablesService,
    private modalService : ModalsService,
    private date: DatesService,



  ) {

    this.userloggedRut = sessionStorage.getItem('auth-user')
    console.log(this.userloggedRut)

    this.countSolicitudes = 0;

    this.rejectRequest = 0;

    this.approveRequest = 0;

    this.unassignedRequest = [];



  }

  ngOnInit(): void {

    this.date.getAllRequest().subscribe( result => {
      console.log(result)

      this.unassignedRequest = result.data_complete;

      this.countSolicitudes = result.count_solicitudes['0']?.count;

      this.rejectRequest = result.reject_Request.length;

      this.approveRequest = result.approve_Request.length;




      // result.map((res: any)=>{
      //   this.unassignedRequest.push(res);
      // })

    })
  }

}
