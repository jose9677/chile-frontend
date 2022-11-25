import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        component: CreateDatesComponent
      },
      {
        path: 'estatu-cita',
        component: StatusDatesComponent
      },
      {
        path: 'confirmar-cita',
        component: ConfirmDatesComponent
      },
      {
        path: 'asignar-visitador',
        component: AssignVisitorDatesComponent
      },
      {
        path: 'editar-visitador-asistente',
        component: EditAssignVisitorDatesComponent
      },
      {
        path: 'asignar-fechas-cita',
        component: AssignDayDatesComponent
      },
      {
        path: 'aprobar-cita',
        component: ApproveDatesComponent
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
