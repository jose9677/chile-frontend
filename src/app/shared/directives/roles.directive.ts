import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedService } from '../services/logged.service';

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective implements OnInit {

  currentUser: any;
  permissions: any[];


  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loggedService: LoggedService
  ) {
  }

  ngOnInit(): void {

    this.currentUser = window.sessionStorage.getItem('rol-user')
    // console.log(this.currentUser)
    this.updateView();

  }

  @Input()
  set appRoles(val:Array<string>) {
    console.log(` ****`, val)
    this.viewContainer.createEmbeddedView(this.templateRef);

    this.permissions = val;
    console.log(this.permissions)

    this.updateView();

  }

  private updateView() {
    // console.log(` ****`)

    this.viewContainer.clear();
    if (this.checkPermission()){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission() {
    console.log(` ****`)

    let hasPermission= false;

    if ( this.currentUser && this.currentUser) {

      console.log('1'+this.currentUser)
      console.log('2'+this.currentUser.role)

      for(const checkPemission of this.permissions) {
        console.log(checkPemission)
        const permissionFound = this.currentUser;
        if (permissionFound) {
          hasPermission= true;
          break;
        }
      }
    }
    return hasPermission;
  }
}
