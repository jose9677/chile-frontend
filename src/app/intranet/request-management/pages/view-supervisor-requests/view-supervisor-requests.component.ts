import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignVisitorDatesComponent } from 'src/app/intranet/dates-management/pages/assign-visitor-dates/assign-visitor-dates.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SortByTablesService } from '../../shared/services/sort-by-tables.service';


@Component({
  selector: 'app-view-supervisor-requests',
  templateUrl: './view-supervisor-requests.component.html',
  styleUrls: ['./view-supervisor-requests.component.scss']
})
export class ViewSupervisorRequestsComponent implements OnInit {


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


    ];


  }

  ngOnInit(): void {



  }

  assingSocialAssistant (nroRequest: any) {

    // this.router.navigate(['dates/assign-Visitor'])
    this.modal.openModalData(AssignVisitorDatesComponent, nroRequest)



  }

  editAssingSocialAssistant (nroRequest: any) {

    this.router.navigate(['dates/edit-assign-visitor'])



  }



}
