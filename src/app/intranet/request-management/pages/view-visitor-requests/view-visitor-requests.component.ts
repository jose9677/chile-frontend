import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';

@Component({
  selector: 'app-view-visitor-requests',
  templateUrl: './view-visitor-requests.component.html',
  styleUrls: ['./view-visitor-requests.component.scss']
})
export class ViewVisitorRequestsComponent implements OnInit {

  unassignedRequest: any[];
  unassignedRequest2: any[];




  dataTable1: any;

  numberRequest:any

  name!:string;

  nameLastnameUser: string = 'Eduy Omaña'

  constructor(
    private router: Router,
    public sortByService: SortByTablesService,
    private modal : ModalsService



  ) {
    this.unassignedRequest = [
      {
        'nroRequest': "3",
        'requestDate': "1/10/2022",
        'namesLastnames': "Eduy Omaña",
        'comune': "La Reina",
        'neighborhood': "Osandon",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "4",
        'requestDate': "3/10/2022",
        'namesLastnames': "Emili Omaña",
        'comune': "La Reina",
        'neighborhood': "Osandon",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'namesLastnames': "Edinson Omaña",
        'comune': "La Reina",
        'neighborhood': "Osandon",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },


    ];


    this.unassignedRequest2 = [
      {
        'nroRequest': "3",
        'requestDate': "1/10/2022",
        'namesLastnames': "Eduy Omaña",
        'comune': "La Reina",
        'neighborhood': "Osandon",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "4",
        'requestDate': "3/10/2022",
        'namesLastnames': "Emili Omaña",
        'comune': "La Reina",
        'neighborhood': "Osandon",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'namesLastnames': "Edinson Omaña",
        'comune': "La Reina",
        'neighborhood': "Osandon",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
    ]
  }

  ngOnInit(): void {



  }

  assignDayDate (nroRequest: any) {

    this.router.navigate(['citas/asignar-fecha-de-cita'])



  }

  approveDates (nroRequest: any) {

    this.router.navigate(['citas/aprobar-cita'])



  }


}
