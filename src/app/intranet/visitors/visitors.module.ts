import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorsComponent } from './visitors.component';
import { RequestManagementComponent } from './pages/request-management/request-management.component';
import { RequestApprovalComponent } from './pages/request-approval/request-approval.component';
import { AssignAppointmentComponent } from './pages/assign-appointment/assign-appointment.component';



@NgModule({
  declarations: [
    VisitorsComponent,
    RequestManagementComponent,
    RequestApprovalComponent,
    AssignAppointmentComponent,
  ],
  imports: [
    CommonModule,
    VisitorsRoutingModule
  ]
})
export class VisitorsModule { }
