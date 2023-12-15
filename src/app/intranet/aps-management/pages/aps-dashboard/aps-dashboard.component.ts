import { Component, OnInit } from '@angular/core';
import { ApsManagementService } from '../../shared/services/aps-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aps-dashboard',
  templateUrl: './aps-dashboard.component.html',
  styleUrls: ['./aps-dashboard.component.scss']
})
export class ApsDashboardComponent implements OnInit {

  public apsUpdateDate: string;
  public apsGenerationDate: string;
  public numberOfRecords: number;
  public coincidences: number;
  public loadedBy: string;
  public status: string;
  public pathAps: string;

  public titleDataTable: string[];
  public dataDataTable: any[];

  constructor(
    private apsSetvices: ApsManagementService,
    private router: Router
  ) {
    this.dataDataTable = [];
    this.titleDataTable = [
      'nro',
      'fecha de actualización',
      'fecha de generación',
      'cantidad de registros',
      'coincidencias (inscritos)',
      'cargado por',
      'estatus'
    ]
   }

  ngOnInit(): void {

    this.latestApsUpdate();
    this.getAllAps();

  }

  latestApsUpdate() {

    this.apsSetvices.getLatestApsUpdate().subscribe((result) => {

      let {update_date, created_at, cant_records, coincidence, user, status_description, path} = result

      this.apsUpdateDate = update_date;
      this.apsGenerationDate = created_at;
      this.numberOfRecords = cant_records;
      this.coincidences = coincidence;
      this.loadedBy = user;
      this.status = status_description;
      this.pathAps = path;

    },
    error => {

    },
    () => {

    })


  }

  getAllAps() {
    this.apsSetvices.getAllAps().subscribe((result: any) => {

      const dataResult : any = [];

      result.map((res: any, i: any)=> {

        dataResult.push({
          'nro.': i+1,
          'fecha de actualización': res.updated_at,
          'fecha de generación': res.created_at,
          'cantidad de registros': res.cant_records,
          'coincidencias (inscritos)': res.coincidence,
          'cargado por': res.user,
          'estatus': res.description,
          'path': res.path
        })
      })

      return this.dataDataTable = dataResult;

    },
    error => {

    },
    () => {
      console.log( this.dataDataTable);

    })
  }

  updateAps(e: Event) {

    e.preventDefault();

    this.router.navigate(['aps/actualizar-aps']);

  }

}
