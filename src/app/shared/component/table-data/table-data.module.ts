import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataComponent } from './table-data.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    TableDataComponent,
    FilterPipe,
    SortByPipe
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // CustomFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    TableDataComponent,


  ]
})
export class TableDataModule { }
