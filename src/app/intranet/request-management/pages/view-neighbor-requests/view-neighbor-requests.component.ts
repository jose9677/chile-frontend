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

  public errors: any = null;

  unassignedRequest: any[];

  private dataRequest: any;


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
        res.fullName = (res.assistant_names ?? ' ') +' '+ (res.assistant_lastname ?? ' ')
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail
        this.unassignedRequest.push(res);
      })
      console.log(this.unassignedRequest)

    },
    error => {

      this.errors = true;
      // let title= "Registro Invalido";
      // let message = "No se pudo realizar el registro del Usuario";
      // this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      // this.isFormSubmitted = true;

    },
    () => {


    });

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
