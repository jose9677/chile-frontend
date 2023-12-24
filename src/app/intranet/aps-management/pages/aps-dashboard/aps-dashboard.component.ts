import { Component, OnInit } from '@angular/core';
import { ApsManagementService } from '../../shared/services/aps-management.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-aps-dashboard',
  templateUrl: './aps-dashboard.component.html',
  styleUrls: ['./aps-dashboard.component.scss']
})
export class ApsDashboardComponent implements OnInit {

  public isUpdateNewList: Observable<boolean>;

  public apsUpdateDate: string;
  public apsGenerationDate: string;
  public numberOfRecords: number;
  public coincidences: number;
  public loadedBy: string;
  public status: string;
  public pathAps: string;
  public listStatusOfProcess: any[];

  public titleDataTable: string[];
  public dataDataTable: any[];

  public subscription: Subscription;


  constructor(
    private apsServices: ApsManagementService,
    private router: Router
  ) {

    this.isUpdateNewList = this.apsServices.statusUpdateNewListObservable;

    this.dataDataTable = [];
    this.listStatusOfProcess = [];
    this.titleDataTable = [
      'Nro.',
      'fecha de actualización',
      'fecha de generación',
      'cantidad de registros',
      'coincidencias (inscritos)',
      'cargado por',
      'estatus'
    ]
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.apsServices.newViewTitle = 'APS';
    })


    this.subscription = this.apsServices.refresh$.subscribe(() => {

      this.latestApsUpdate();
      this.statusOfProcess();
      this.getAllAps();

    })

    this.latestApsUpdate();
    this.getAllAps();
    if(this.apsServices.statusUpdateNewListValue) {
      setTimeout(() => {
        this.statusOfProcess();
      }, 1000)
    } else {
      this.statusOfProcess();
    }
  }

  latestApsUpdate() {

    this.apsServices.getLatestApsUpdate().subscribe((result) => {

      let {update_date, created_at, cant_records, coincidence, user_name, status_description, path} = result

      this.apsUpdateDate = update_date;
      this.apsGenerationDate = created_at;
      this.numberOfRecords = cant_records;
      this.coincidences = coincidence;
      this.loadedBy = user_name;
      this.status = status_description;
      this.pathAps = this.apsServices.downloadDocumentAps(path);

    },
    error => {

    },
    () => {

    })


  }

  getAllAps() {
    this.apsServices.getAllAps().subscribe((result: any) => {

      const dataResult : any = [];

      result.map((res: any, i: any)=> {

        dataResult.push({
          'Nro.': i+1,
          'fecha de actualización': res.updated_at,
          'fecha de generación': res.created_at,
          'cantidad de registros': res.cant_records,
          'coincidencias (inscritos)': res.coincidence,
          'cargado por': res.user_name,
          'estatus': res.description,
          'path': this.apsServices.downloadDocumentAps(res.path)
        })
      })

      return this.dataDataTable = dataResult;

    },
    error => {

    },
    () => {

    })
  }

  statusOfProcess() {
    this.apsServices.statusOfProcess().subscribe((result: any) => {

      return this.listStatusOfProcess = result;
    },
    error => {

    },
    () => {

    })
  }

  updateAps(e: Event) {

    e.preventDefault();

    this.router.navigate(['aps/actualizar-aps']);

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
