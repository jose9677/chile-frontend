import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteAccessGuard implements CanActivate {
  
  public rolUser: any | null;
  
  constructor (
    private router: Router
  ) {

    this.rolUser = sessionStorage.getItem('rol-user');
    console.log(this.rolUser)

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if ( this.rolUser == 1) {
        alert('vecino')
        return this.router.navigate(['/solicitud/solicitudes-de-inscripcion'])
      } 
      else if (this.rolUser == 2) {
        alert('Asistente Social')
        return this.router.navigate(['/solicitud/asignar-cita'])        
      } 
      else if (this.rolUser == 3) {
        alert('Supervisor')
        return this.router.navigate(['/solicitud/asignar-asistente-social'])        
      }
      else if (this.rolUser == 4) {
        alert('Administrador')
        return this.router.navigate(['/solicitud/escritorio'])        
      }
      else if (this.rolUser == 5) {
        alert('Soporte')
        return this.router.navigate(['/solicitud/escritorio'])        
      }

    return true;
  }
  
}
