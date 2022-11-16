import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisorsRoutingModule } from './supervisors-routing.module';
import { SupervisorsComponent } from './supervisors.component';
import { RequestsComponent } from './requests/requests.component';
import { AssignRequestComponent } from './requests/assign-request/assign-request.component';
import { AssignRequestFormComponent } from './assign-request-form/assign-request-form.component';


@NgModule({
  declarations: [
    SupervisorsComponent,
    RequestsComponent,
    AssignRequestComponent,
    AssignRequestFormComponent
  ],
  imports: [
    CommonModule,
    SupervisorsRoutingModule
  ]
})
export class SupervisorsModule { }
