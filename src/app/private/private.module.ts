import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';


@NgModule({
  declarations: [
    ViewUsersComponent,
    CreateUsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
