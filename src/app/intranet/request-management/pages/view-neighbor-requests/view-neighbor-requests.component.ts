import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { any } from 'underscore';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';

@Component({
  selector: 'app-view-neighbor-requests',
  templateUrl: './view-neighbor-requests.component.html',
  styleUrls: ['./view-neighbor-requests.component.scss']
})
export class ViewNeighborRequestsComponent implements OnInit {

  private rutNeighbor: any;

  unassignedRequest: any[];



  constructor(
    private router: Router,
    public sortByService : SortByTablesService,
    private modal : ModalsService,
    private date: DatesService,



  ) {

    this.rutNeighbor = window.sessionStorage.getItem('auth-user');

    this.unassignedRequest = [];


  }

  ngOnInit(): void {


    this.date.getForRut(this.rutNeighbor.replace(/["']/g, "")).subscribe( result => {
      console.log(result);

      result.map((res: any)=>{
        result.fullName = result.names +' '+ result.lastname
        this.unassignedRequest.push(res);
      })
      console.log(this.unassignedRequest)

    })




  }



  viewDate (id_request: any) {

    this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }

  confirmDate (id_request: any) {

    this.router.navigate(['citas/confirmar-cita'], {queryParams: {id_request: id_request}});

  }

  createDate () {

    this.router.navigate(['citas/crear-cita'])
  }






}
