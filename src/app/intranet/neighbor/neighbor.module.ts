import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeighborRoutingModule } from './neighbor-routing.module';
import { NeighborComponent } from './neighbor.component';
import { CreateRequestComponent } from './page/create-request/create-request.component';


@NgModule({
  declarations: [
    NeighborComponent,
    CreateRequestComponent
  ],
  imports: [
    CommonModule,
    NeighborRoutingModule
  ]
})
export class NeighborModule { }
