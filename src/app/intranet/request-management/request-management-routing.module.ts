import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteAccessGuard } from 'src/app/shared/guards/route-access.guard';
import { LayoutsComponent } from './layouts/layouts.component';
import { ViewAdminRequestsComponent } from './pages/view-admin-requests/view-admin-requests.component';
import { ViewNeighborRequestsComponent } from './pages/view-neighbor-requests/view-neighbor-requests.component';
import { ViewSupervisorRequestsComponent } from './pages/view-supervisor-requests/view-supervisor-requests.component';
import { ViewVisitorRequestsComponent } from './pages/view-visitor-requests/view-visitor-requests.component';

import {Access1Guard} from 'src/app/shared/guards/access-1.guard';
import { Access2Guard } from 'src/app/shared/guards/access-2.guard';
import { Access4Guard } from 'src/app/shared/guards/access-4.guard';
import { Access3Guard } from 'src/app/shared/guards/access-3.guard';
import { Access5Guard } from 'src/app/shared/guards/access-5.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'asignar-asistente-social',
        component: ViewSupervisorRequestsComponent,
        canActivate: [Access3Guard]

      },
      {
        path: 'asignar-cita',
        component: ViewVisitorRequestsComponent,
        canActivate: [Access2Guard]

      },
      {
        path: 'solicitudes-de-inscripcion',
        component: ViewNeighborRequestsComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'escritorio',
        component: ViewAdminRequestsComponent,
        canActivate: [Access4Guard]

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
