import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';
import { LoggedService } from 'src/app/shared/services/logged.service';

@Component({
  selector: 'app-view-neighbor-requests',
  templateUrl: './view-neighbor-requests.component.html',
  styleUrls: ['./view-neighbor-requests.component.scss']
})
export class ViewNeighborRequestsComponent implements OnInit {

  private rutNeighbor: any;

  private userloggedRole: any;

  public errors: any = null;

  unassignedRequest: any[];

  private dataRequest: any;


  constructor(
    private router: Router,
    public sortByService : SortByTablesService,
    private modal : ModalsService,
    private loggedService: LoggedService,
    private date: DatesService,



  ) {

    this.unassignedRequest = [];

  }

  ngOnInit(): void {

     this.rutNeighbor = JSON.parse(window.sessionStorage.getItem("auth-user"));
     this.userloggedRole = JSON.parse(window.sessionStorage.getItem("rol-user"));


    this.getForRut();

  }

  getForRut() {

    let requestForUser: any[] = [];

    this.date.getForRut(this.rutNeighbor).subscribe( result => {

      let lastRequest = (result.sort((a, b) => b.id_request - a.id_request)).slice(0,1);

      let statusLastRequest = lastRequest[0].id_status;

      let isExpiredRequest = [7, 9, 14].includes(statusLastRequest);

      sessionStorage.setItem('isExpiredRequest', isExpiredRequest.toString());


      result.map((res: any)=>{

        res.fullName = (res.assistant_names ?? ' ') +' '+ (res.assistant_lastname ?? ' ')
        res.fullPeventionData = res.prevention_type +' - '+ res.prevention_detail

        if (this.userloggedRole === 1) {
          res['displayStatus'] = res.status;
        }

        if (this.userloggedRole !== 1) {
          res['displayStatus'] = res.status_emp;
        }

        // window.sessionStorage.setItem("status-request", JSON.stringify(res.id_status));

      })


      requestForUser = result;

    },
    error => {

      this.errors = true;
      // let title= "Registro Invalido";
      // let message = "No se pudo realizar el registro del Usuario";
      // this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);
      // this.isFormSubmitted = true;

    },
    () => {

      this.unassignedRequest = requestForUser;

    });
  }

  viewDate (id_request: any) {

    this.router.navigate(['citas/estatus-cita'],{queryParams: {id_request : id_request}});

  }

  confirmDate (id_request: any) {

    this.router.navigate(['citas/confirmar-cita'], {queryParams: {id_request: id_request}});

  }

  confirmRenovation (id_request: any) {

    this.router.navigate(['citas/confirmar-renovacion'], {queryParams: {id_renovation: id_request}});

  }

  createDate (e: Event) {

    e.preventDefault();
    this.router.navigate(['citas/crear-cita'], {queryParams: {rut_user: this.rutNeighbor}});
  }






}
