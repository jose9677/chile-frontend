import { Component, OnInit } from '@angular/core';
import {DataTable} from "simple-datatables"



@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss']
})
export class RequestManagementComponent implements OnInit {

  unassignedRequest: any;

  nameLastnameUser: string = 'Eduy Omaña'

  constructor() {
    const unassignedRequest: any = [
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

    this.unassignedRequest = {

      headings: Object.keys(unassignedRequest[0]),

      data: []

    };

    for ( let i = 0; i < unassignedRequest.length; i++ ) {

      this.unassignedRequest.data[i] = [];

      for (let p in unassignedRequest[i]) {
        if( unassignedRequest[i].hasOwnProperty(p) ) {
            this.unassignedRequest.data[i].push(unassignedRequest[i][p]);
        }
      }
    }


  }

  ngOnInit(): void {
    const dataTable1: any = new DataTable("#unassignedRequest",{
      searchable: true,
      fixedHeight: true,
      truncatePager: false,
      footer: false,
      layout: {
        top: "{select}{search}",
        bottom: "{info}{pager}"
      },
      labels: {
        placeholder: "Buscar...",
        perPage: "{select} entradas por pagina",
        noRows: "No hay entradas para encontrar",
        info: "mostrando {start} de {end} de {rows} entradas",
      },
    });

    const dataTable2: any = new DataTable("#quotesOfTheDay",{
      searchable: true,
      fixedHeight: true,
      truncatePager: false,
      footer: false,
      layout: {
        top: "{select}{search}",
        bottom: "{info}{pager}"
      },
      labels: {
        placeholder: "Buscar...",
        perPage: "{select} entradas por pagina",
        noRows: "No hay entradas para encontrar",
        info: "mostrando {start} de {end} de {rows} entradas",
      },
    });

    dataTable1.insert(this.unassignedRequest);
    dataTable2.insert(this.unassignedRequest);


    console.log(dataTable1)
  }

}
