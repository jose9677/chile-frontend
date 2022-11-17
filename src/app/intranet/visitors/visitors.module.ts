import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorsComponent } from './visitors.component';
import { RequestManagementComponent } from './pages/request-management/request-management.component';


@NgModule({
  declarations: [
    VisitorsComponent,
    RequestManagementComponent
  ],
  imports: [
    CommonModule,
    VisitorsRoutingModule
  ]
})
export class VisitorsModule { }
