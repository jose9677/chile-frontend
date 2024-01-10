import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutApsComponent } from './layouts/layout-aps/layout-aps.component';
import { ApsDashboardComponent } from './pages/aps-dashboard/aps-dashboard.component';
import { ApsUpdateComponent } from './pages/aps-update/aps-update.component';
import { Access45Guard } from 'src/app/shared/guards/access-4-5.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutApsComponent,
    children: [
      {
        path: 'dashboard',
        component: ApsDashboardComponent,
        canActivate: [Access45Guard]
      },
      {
        path: 'actualizar-aps',
        component: ApsUpdateComponent,
        canActivate: [Access45Guard]
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
