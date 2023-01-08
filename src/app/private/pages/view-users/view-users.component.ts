import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrivateService } from '../../share/services/private.service';
import { SortByTablesService } from 'src/app/intranet/request-management/shared/services/sort-by-tables.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { UserActiveComponent } from '../modales/user-active/user-active.component';
import { UserDesactiveComponent } from '../modales/user-desactive/user-desactive.component';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit, OnDestroy {
  public Usuarios: any[]= [];
  public rut:any = sessionStorage.getItem("auth-user");
  public id:any = sessionStorage.getItem("rol-user") ;
  public nuevoRut:any
  suscription: Subscription;

  constructor(
    private router: Router,
    private modalService: ModalsService,
    private privateService:PrivateService,
    public sortByService : SortByTablesService,
  ) {
    this.nuevoRut=""
      for(let i=0; i<this.rut.length;i++){
        if (this.rut[i]!='"'){
          this.nuevoRut+=this.rut[i]
        }
      }
    if(this.id==3){
      this.privateService.verAsistentes(this.nuevoRut).subscribe(dataRequest => {
        console.log(dataRequest)
        this.Usuarios=dataRequest
      })
    }else if(this.id==4){
      this.privateService.verUsuarios().subscribe(dataRequest => {
        console.log(dataRequest)
        this.Usuarios=dataRequest
      })
    }else if(this.id==5){
      this.privateService.verTodosLosUsuarios().subscribe(dataRequest => {
        console.log(dataRequest)
        this.Usuarios=dataRequest
      })
    }
   }

  ngOnInit(): void {
    if(this.id==3){
      this.suscription = this.privateService.refresh$.subscribe(()=>{
        this.privateService.verAsistentes(this.nuevoRut).subscribe(dataRequest => {
          console.log(dataRequest)
          this.Usuarios=dataRequest
        })
      })
    }else if(this.id==4){
      this.suscription = this.privateService.refresh$.subscribe(()=>{
        this.privateService.verUsuarios().subscribe(dataRequest => {
          console.log(dataRequest)
          this.Usuarios=dataRequest
        })
      })
    }else if(this.id==5){
      this.suscription = this.privateService.refresh$.subscribe(()=>{
        this.privateService.verTodosLosUsuarios().subscribe(dataRequest => {
          console.log(dataRequest)
          this.Usuarios=dataRequest
        })
      })
    }
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('observable destruido');
  }
  activarUser(Rut:any){
    this.privateService.ActivarUser(Rut).subscribe(dataRequest => {
      this.modalService.openModal(UserActiveComponent)
      console.log(dataRequest)
    })
   }

   desactivarUser(Rut:any){
    this.privateService.desactivarUser(Rut).subscribe(dataRequest => {
      this.modalService.openModal(UserDesactiveComponent)
      console.log(dataRequest)
    })
   }

   editar(Rut:any){
    //  this.privateService.rutEdit.emit({
    //    data:Rut
    //   })
    this.router.navigate(['/privado/editar-usuario/' + Rut])
   }

   VerUsuario(Rut:any){
    //  this.privateService.rutEdit.emit({
    //    data:Rut
    //   })
    this.router.navigate(['/privado/ver-usuario/' + Rut])
   }
}
