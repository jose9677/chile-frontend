import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';

@Component({
  selector: 'app-view-neighbor-requests',
  templateUrl: './view-neighbor-requests.component.html',
  styleUrls: ['./view-neighbor-requests.component.scss']
})
export class ViewNeighborRequestsComponent implements OnInit {

  unassignedRequest: any[];
  unassignedRequest2: any[];


  constructor(
    private router: Router,
    public sortByService : SortByTablesService,
    private modal : ModalsService


  ) {
    this.unassignedRequest = [
      {
        'nroRequest': "3",
        'requestDate': "1/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "4",
        'requestDate': "3/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "2",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Zedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "1",
        'requestDate': "12/10/2022",
        'fonasa': "tippo c",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },




    ];

    this.unassignedRequest2 = [
      {
        'nroRequest': "3",
        'requestDate': "1/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "4",
        'requestDate': "3/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'dateOfVisit': '',
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",

      },
      {
        'nroRequest': "2",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "5",
        'requestDate': "12/10/2022",
        'fonasa': "tippo A",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Zedro Perez",
        'status': "Cita Pendiente",
      },
      {
        'nroRequest': "1",
        'requestDate': "12/10/2022",
        'fonasa': "tippo c",
        'isapre': "No posee",
        'service': "asss",
        'visitor': "Pedro Perez",
        'status': "Cita Pendiente",
      },
    ]


  }

  ngOnInit(): void {



  }

  viewDate (nroRequest: any) {

    this.router.navigate(['dates/status'])



  }

  confirmDate (nroRequest: any) {

    this.router.navigate(['dates/confirm'])



  }

  createDate () {

    this.router.navigate(['dates/create'])
  }






}
