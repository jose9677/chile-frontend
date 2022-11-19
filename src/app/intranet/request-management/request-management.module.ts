import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestManagementRoutingModule } from './request-management-routing.module';
import { ViewSupervisorRequestsComponent } from './pages/view-supervisor-requests/view-supervisor-requests.component';
import { ViewVisitorRequestsComponent } from './pages/view-visitor-requests/view-visitor-requests.component';
import { ViewNeighborRequestsComponent } from './pages/view-neighbor-requests/view-neighbor-requests.component';
import { LayoutsComponent } from './layouts/layouts.component';


@NgModule({
  declarations: [
    ViewSupervisorRequestsComponent,
    ViewVisitorRequestsComponent,
    ViewNeighborRequestsComponent,
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    RequestManagementRoutingModule
  ]
})
export class RequestManagementModule { }
