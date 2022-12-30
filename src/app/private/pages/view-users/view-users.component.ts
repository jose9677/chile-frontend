import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrivateService } from '../../share/services/private.service';
import { SortByTablesService } from 'src/app/intranet/request-management/shared/services/sort-by-tables.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit, OnDestroy {
  public Usuarios: any[]= [];
  suscription: Subscription;

  constructor(
    private router: Router,
    private privateService:PrivateService,
    public sortByService : SortByTablesService,
  ) {
    this.privateService.verUsuarios().subscribe(dataRequest => {
      console.log(dataRequest)
      this.Usuarios=dataRequest
    })
   }

  ngOnInit(): void {
    this.suscription = this.privateService.refresh$.subscribe(()=>{
      this.privateService.verUsuarios().subscribe(dataRequest => {
        console.log(dataRequest)
        this.Usuarios=dataRequest
      })
    })
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('observable destruido');
  }
  activarUser(Rut:any){
    this.privateService.ActivarUser(Rut).subscribe(dataRequest => {
      console.log(dataRequest)
    })
   }

   desactivarUser(Rut:any){
    this.privateService.desactivarUser(Rut).subscribe(dataRequest => {
      console.log(dataRequest)
    })
   }

   editar(Rut:any){
    //  this.privateService.rutEdit.emit({
    //    data:Rut
    //   })
    this.router.navigate(['/privado/editar-usuario/' + Rut])
   }
}
