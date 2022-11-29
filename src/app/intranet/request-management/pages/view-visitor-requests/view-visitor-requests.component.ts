import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';

@Component({
  selector: 'app-view-visitor-requests',
  templateUrl: './view-visitor-requests.component.html',
  styleUrls: ['./view-visitor-requests.component.scss']
})
export class ViewVisitorRequestsComponent implements OnInit {

  private rutUserLogged: any;

  unassignedRequest: any[];
  unassignedRequest2: any[];




  dataTable1: any;

  numberRequest:any

  name!:string;

  nameLastnameUser: string = 'Eduy Omaña'

  constructor(
    private router: Router,
    public sortByService: SortByTablesService,
    private modal : ModalsService,
    private date: DatesService



  ) {

    this.rutUserLogged = window.sessionStorage.getItem('auth-user')

    this.unassignedRequest = [];

    this.unassignedRequest2 = [];
  }

  ngOnInit(): void {

    this.date.getforSocialAssistant(this.rutUserLogged.replace(/["']/g, "")).subscribe( result => {
      console.log(result);

      // result.map((res: any)=>{

      //   if (res.employee_rut != null) {
      //     this.unassignedRequest2.push(res);
      //   }else{
      //     this.unassignedRequest.push(res);
      //   }
      // })
      console.log(this.unassignedRequest)

    })

  }

  assignDayDate (nroRequest: any) {

    this.router.navigate(['citas/asignar-fecha-de-cita'])



  }

  approveDates (nroRequest: any) {

    this.router.navigate(['citas/aprobar-cita'])



  }


}
