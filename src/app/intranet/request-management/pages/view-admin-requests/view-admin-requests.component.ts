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

    this.unassignedRequest = [];



  }

  ngOnInit(): void {

    this.date.getAll().subscribe( result => {
      console.log(result)

      result.map((res: any)=>{
        this.unassignedRequest.push(res);
      })

    })
  }  

}
