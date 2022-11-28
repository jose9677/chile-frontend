import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatesService } from 'src/app/intranet/dates-management/shared/services/dates.service';
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
    private modal : ModalsService,
    private date: DatesService,



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

    this.getRequestForRut();


  }

  getRequestForRut() {
    this.date.getForRut();
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
