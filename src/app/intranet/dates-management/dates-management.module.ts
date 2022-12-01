import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatesManagementRoutingModule } from './dates-management-routing.module';
import { LayoutDatesComponent } from './layouts/layout-dates/layout-dates.component';
import { CreateDatesComponent } from './pages/create-dates/create-dates.component';
import { StatusDatesComponent } from './pages/status-dates/status-dates.component';
import { ConfirmDatesComponent } from './pages/confirm-dates/confirm-dates.component';
import { AssignVisitorDatesComponent } from './pages/assign-visitor-dates/assign-visitor-dates.component';
import { EditAssignVisitorDatesComponent } from './pages/edit-assign-visitor-dates/edit-assign-visitor-dates.component';
import { AssignDayDatesComponent } from './pages/assign-day-dates/assign-day-dates.component';
import { ApproveDatesComponent } from './pages/approve-dates/approve-dates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    LayoutDatesComponent,
    CreateDatesComponent,
    StatusDatesComponent,
    ConfirmDatesComponent,
    AssignVisitorDatesComponent,
    EditAssignVisitorDatesComponent,
    AssignDayDatesComponent,
    ApproveDatesComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatesManagementRoutingModule,
    NgSelectModule
  ]
})
export class DatesManagementModule { }
