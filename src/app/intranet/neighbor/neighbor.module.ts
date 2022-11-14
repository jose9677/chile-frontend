import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeighborRoutingModule } from './neighbor-routing.module';
import { NeighborComponent } from './neighbor.component';


@NgModule({
  declarations: [
    NeighborComponent
  ],
  imports: [
    CommonModule,
    NeighborRoutingModule
  ]
})
export class NeighborModule { }
