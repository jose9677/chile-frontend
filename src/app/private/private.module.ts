import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LayoutAdminUsersComponent } from './layout-admin-users/layout-admin-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipe } from '../intranet/request-management/shared/pipes/filter.pipe';
import { SortByPipe } from '../intranet/request-management/shared/pipes/sort-by.pipe';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { EditRoleComponent } from './pages/edit-role/edit-role.component';
import { UserUpdateComponent } from './pages/modales/user-update/user-update.component';
import { UserCreatedComponent } from './pages/modales/user-created/user-created.component';
import { UserActiveComponent } from './pages/modales/user-active/user-active.component';
import { UserDesactiveComponent } from './pages/modales/user-desactive/user-desactive.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { GenerateReportsComponent } from './pages/generate-reports/generate-reports.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ViewNeighborsComponent } from './pages/view-neighbors/view-neighbors.component';
import { ViewNeighborComponent } from './pages/view-neighbor/view-neighbor.component';
import { CustomFormsModule } from 'ngx-custom-validators';


@NgModule({
  declarations: [
    ViewUsersComponent,
    CreateUsersComponent,
    EditUserComponent,
    LayoutAdminUsersComponent,
    RolesComponent,
    AddRoleComponent,
    EditRoleComponent,
    UserUpdateComponent,
    UserCreatedComponent,
    UserActiveComponent,
    UserDesactiveComponent,
    ViewUserComponent,
    GenerateReportsComponent,
    PasswordChangeComponent,
    ViewNeighborsComponent,
    ViewNeighborComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ]
})
export class PrivateModule { }
