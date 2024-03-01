import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestManagementRoutingModule } from './request-management-routing.module';
import { ViewSupervisorRequestsComponent } from './pages/view-supervisor-requests/view-supervisor-requests.component';
import { ViewVisitorRequestsComponent } from './pages/view-visitor-requests/view-visitor-requests.component';
import { ViewNeighborRequestsComponent } from './pages/view-neighbor-requests/view-neighbor-requests.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { SortByPipe } from './shared/pipes/sort-by.pipe';
import { SortBy2Pipe } from './shared/pipes/sort-by2.pipe';
import { Filter2Pipe } from './shared/pipes/filter2.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewAdminRequestsComponent } from './pages/view-admin-requests/view-admin-requests.component';
import { FilterTableNeighborPipe } from './shared/pipes/filter-table-neighbor.pipe';
import { FilterTable1AssistantPipe } from './shared/pipes/filter-table1-assistant.pipe';
import { FilterTable2AssistantPipe } from './shared/pipes/filter-table2-assistant.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { TableDataModule } from 'src/app/shared/component/table-data/table-data.module';


@NgModule({
  declarations: [
    ViewSupervisorRequestsComponent,
    ViewVisitorRequestsComponent,
    ViewNeighborRequestsComponent,
    ViewAdminRequestsComponent,
    LayoutsComponent,
    FilterPipe,
    SortByPipe,
    SortBy2Pipe,
    Filter2Pipe,
    FilterTableNeighborPipe,
    FilterTable1AssistantPipe,
    FilterTable2AssistantPipe,

  ],


  imports: [
    CommonModule,
    RequestManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    TableDataModule,
    NgxMaskModule.forRoot(),

  ]
})
export class RequestManagementModule { }
