import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsRoutingModule { }
