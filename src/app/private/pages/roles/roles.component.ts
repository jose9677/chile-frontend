import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrivateService } from '../../share/services/private.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  public roles:any;
  suscription: Subscription;

  constructor(
    private privateService:PrivateService,
    private router: Router,
  ) {
    this.privateService.roles().subscribe(dataRequest => {
      let array: any[]= []
      for (let i=1; i<dataRequest.length; i++){
        array.push(dataRequest[i])
      }
      this.roles=array
      console.log(this.roles)
    })
   }

  ngOnInit(): void {

    this.suscription = this.privateService.refresh$.subscribe(()=>{
      this.privateService.roles().subscribe(dataRequest => {
        let array: any[]= []
        for (let i=1; i<dataRequest.length; i++){
          array.push(dataRequest[i])
        }
        this.roles=array
        console.log(this.roles)

      })
    })

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('observable destruido');
  }

  editar(Rol:any){
    //  this.privateService.rutEdit.emit({
    //    data:Rut
    //   })
    this.router.navigate(['/privado/editar-rol/' + Rol])
   }

   activarRol(id:any){
    this.privateService.ActivarRol(id).subscribe(dataRequest => {
      console.log(dataRequest)
    })

   }

   desactivarRol(id:any){
    this.privateService.desactivarRol(id).subscribe(dataRequest => {
      console.log(dataRequest)
    })

   }

}
