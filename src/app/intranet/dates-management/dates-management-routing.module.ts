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
        path: 'create',
        component: CreateDatesComponent
      },
      {
        path: 'status',
        component: StatusDatesComponent
      },
      {
        path: 'confirm',
        component: ConfirmDatesComponent
      },
      {
        path: 'assign-Visitor',
        component: AssignVisitorDatesComponent
      },
      {
        path: 'edit-assign-visitor',
        component: EditAssignVisitorDatesComponent
      },
      {
        path: 'assign-day',
        component: AssignDayDatesComponent
      },
      {
        path: 'approve',
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
