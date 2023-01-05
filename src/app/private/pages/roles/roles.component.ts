import { Component, OnInit } from '@angular/core';
import { PrivateService } from '../../share/services/private.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public roles:any

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
  }

  editar(Rol:any){
    //  this.privateService.rutEdit.emit({
    //    data:Rut
    //   })
    this.router.navigate(['/privado/editar-rol/' + Rol])
   }

}
