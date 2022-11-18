import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignAppointmentComponent } from './pages/assign-appointment/assign-appointment.component';
import { RequestApprovalComponent } from './pages/request-approval/request-approval.component';
import { RequestManagementComponent } from './pages/request-management/request-management.component';
import { VisitorsComponent } from './visitors.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorsComponent,
    children: [
      {
        path: '',
        redirectTo: 'request-management',
        pathMatch: 'full'
      },
      {
        path: 'request-management',
        component: RequestManagementComponent
      },
       {
        path:'assign-appointment',
        component: AssignAppointmentComponent
      },
      {
        path:'request-approval',
        component: RequestApprovalComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsRoutingModule { }
