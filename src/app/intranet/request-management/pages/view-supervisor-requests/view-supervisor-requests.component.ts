import { Component, OnInit } from '@angular/core';
import {DataTable} from "simple-datatables"


@Component({
  selector: 'app-view-supervisor-requests',
  templateUrl: './view-supervisor-requests.component.html',
  styleUrls: ['./view-supervisor-requests.component.scss']
})
export class ViewSupervisorRequestsComponent implements OnInit {

  unassignedRequest: any;

  dataTable1: any;

  name!:string;

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
      columns: [
        {
          select: 8,
          render: function(data: any, cell: any, row: any) {
            console.log(data)

            return data + "<input id ='buttom-table"+ row.dataIndex +"' type='bottom'  value='"  + row.dataIndex + "'>Select</input>";
        }
        }
      ]
    });

    const index: any = document.getElementById("buttom-table1");
    console.log(index)


    this.dataTable1= dataTable1;

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

    let columns  = dataTable1.data;

    this.indexDataTable(1);

  }


  indexDataTable(index: number) {

    let row = [].slice.call(this.dataTable1.data[index].cells).map(function(cell) { return cell["data"]});

    console.log(row);
    console.log(index);
  }

}
