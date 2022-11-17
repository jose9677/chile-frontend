import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorsRoutingModule } from './supervisors-routing.module';
import { SupervisorsComponent } from './supervisors.component';


@NgModule({
  declarations: [
    SupervisorsComponent
  ],
  imports: [
    CommonModule,
    SupervisorsRoutingModule
  ]
})
export class SupervisorsModule { }
