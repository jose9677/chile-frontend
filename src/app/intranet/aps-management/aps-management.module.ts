import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApsManagementRoutingModule } from './aps-management-routing.module';
import { LayoutApsComponent } from './layouts/layout-aps/layout-aps.component';
import { ApsDashboardComponent } from './pages/aps-dashboard/aps-dashboard.component';
import { TableDataComponent } from 'src/app/shared/component/table-data/table-data.component';
import { FilterPipe } from 'src/app/shared/component/table-data/pipes/filter.pipe';
import { SortByPipe } from 'src/app/shared/component/table-data/pipes/sort-by.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { ApsUpdateComponent } from './pages/aps-update/aps-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomFormsModule } from 'ngx-custom-validators';


@NgModule({
  declarations: [
    LayoutApsComponent,
    ApsDashboardComponent,
    TableDataComponent,
    FilterPipe,
    SortByPipe,
    ApsUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CustomFormsModule,
    ApsManagementRoutingModule,
    NgxMaskModule.forRoot(),

  ]
})
export class ApsManagementModule { }
