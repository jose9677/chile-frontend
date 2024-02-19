import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Access1Guard } from 'src/app/shared/guards/access-1.guard';
import { Access2Guard } from 'src/app/shared/guards/access-2.guard';
import { Access3Guard } from 'src/app/shared/guards/access-3.guard';
import { Access5Guard } from 'src/app/shared/guards/access-5.guard';
import { LayoutDatesComponent } from './layouts/layout-dates/layout-dates.component';
import { ApproveDatesComponent } from './pages/approve-dates/approve-dates.component';
import { AssignDayDatesComponent } from './pages/assign-day-dates/assign-day-dates.component';
import { AssignVisitorDatesComponent } from './pages/assign-visitor-dates/assign-visitor-dates.component';
import { ConfirmDatesComponent } from './pages/confirm-dates/confirm-dates.component';
import { CreateDatesComponent } from './pages/create-dates/create-dates.component';
import { EditAssignVisitorDatesComponent } from './pages/edit-assign-visitor-dates/edit-assign-visitor-dates.component';
import { StatusDatesComponent } from './pages/status-dates/status-dates.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDatesComponent,
    children: [
      {
        path: 'crear-cita',
        component: StatusDatesComponent,
        canActivate: [Access1Guard]

      },
      {
        path: 'estatus-cita',
        component: StatusDatesComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'confirmar-cita',
        component: ConfirmDatesComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'asignar-asistente-social',
        component: AssignVisitorDatesComponent,
        canActivate: [Access3Guard]
      },
      {
        path: 'editar-asistente-social',
        component: EditAssignVisitorDatesComponent,
        canActivate: [Access3Guard]
      },
      {
        path: 'asignar-fecha-de-cita',
        component: AssignDayDatesComponent,
        canActivate: [Access2Guard]
      },
      {
        path: 'aprobar-cita',
        component: ApproveDatesComponent,
        canActivate: [Access2Guard]
      },
      // {
      //   path: '',
      //   redirectTo:'status',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatesManagementRoutingModule { }
