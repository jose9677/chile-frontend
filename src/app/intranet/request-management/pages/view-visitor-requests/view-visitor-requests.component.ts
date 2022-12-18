import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
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

  dataUser: any[];




  dataTable1: any;

  numberRequest:any

  name!:string;

  nameLastnameUser: string = 'Eduy Omaña'

  constructor(
    private router: Router,
    public sortByService: SortByTablesService,
    private modalService : ModalsService,
    private dateServices: DatesService



  ) {

    this.rutUserLogged = window.sessionStorage.getItem('auth-user')

    this.unassignedRequest = [];

    this.unassignedRequest2 = [];
  }

  ngOnInit(): void {

    this.getforSocialAssistant();

  }

  getforSocialAssistant() {

    this.dateServices.getforSocialAssistant(this.rutUserLogged.replace(/["']/g, "")).subscribe( result => {

      console.log(result)

      let dataUser= result.data_employe;
      this.dataUser = dataUser
      console.log(dataUser);

      let datarequests= result.data_Neightbor;
      console.log(datarequests);

      datarequests.map((res: any)=>{

        if (res.id_status == 2 || res.id_status == 5   ) {
          this.unassignedRequest.push(res);
        }else{
          this.unassignedRequest2.push(res);
        }
      })
      console.log(this.unassignedRequest)

    },
    error => {

    },
    () => {


    })

  }

  assignDayDate (id_request: any) {

    this.router.navigate(['citas/asignar-fecha-de-cita'], {queryParams: {id_request : id_request}});



  }

  approveDates (id_request: any) {

    this.router.navigate(['citas/aprobar-cita'], {queryParams: {id_request : id_request}});

  }


}
