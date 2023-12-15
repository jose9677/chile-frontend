import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutApsComponent } from './layouts/layout-aps/layout-aps.component';
import { ApsDashboardComponent } from './pages/aps-dashboard/aps-dashboard.component';
import { ApsUpdateComponent } from './pages/aps-update/aps-update.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutApsComponent,
    children: [
      {
        path: 'dashboard',
        component: ApsDashboardComponent,
        // canActivate: [Access1Guard]
      },
      {
        path: 'actualizar-aps',
        component: ApsUpdateComponent,
        // canActivate: [Access1Guard]
      },
      {
        path: '',
        redirectTo:'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApsManagementRoutingModule { }
