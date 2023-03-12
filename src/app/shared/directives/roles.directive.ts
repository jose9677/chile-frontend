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
    this.updateView();

  }

  @Input()
  set appRoles(val:Array<string>) {
    this.viewContainer.createEmbeddedView(this.templateRef);

    this.permissions = val;

    this.updateView();

  }

  private updateView() {

    this.viewContainer.clear();
    if (this.checkPermission()){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission() {

    let hasPermission= false;

    if ( this.currentUser && this.currentUser) {

      for(const checkPemission of this.permissions) {
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
