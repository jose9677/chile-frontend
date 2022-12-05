import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAccessGuard } from 'src/app/shared/guards/route-access.guard';
import { LayoutsComponent } from './layouts/layouts.component';
import { ViewAdminRequestsComponent } from './pages/view-admin-requests/view-admin-requests.component';
import { ViewNeighborRequestsComponent } from './pages/view-neighbor-requests/view-neighbor-requests.component';
import { ViewSupervisorRequestsComponent } from './pages/view-supervisor-requests/view-supervisor-requests.component';
import { ViewVisitorRequestsComponent } from './pages/view-visitor-requests/view-visitor-requests.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'asignar-asistente-social',
        component: ViewSupervisorRequestsComponent
      },
      {
        path: 'asignar-cita',
        component: ViewVisitorRequestsComponent
      },
      {
        path: 'solicitudes-de-inscripcion',
        component: ViewNeighborRequestsComponent
      },
      {
        path: 'escritorio',
        component: ViewAdminRequestsComponent
      },
      {
        path: '**',
        // redirectTo:'solicitudes-de-inscripcion',
        canActivate: [RouteAccessGuard],
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestManagementRoutingModule { }
