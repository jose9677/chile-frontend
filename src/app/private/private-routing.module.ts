import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LayoutAdminUsersComponent } from './layout-admin-users/layout-admin-users.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { EditRoleComponent } from './pages/edit-role/edit-role.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { Access345Guard } from '../shared/guards/access-3-4-5.guard';
import { Access45Guard } from '../shared/guards/access-4-5.guard';
import { GenerateReportsComponent } from './pages/generate-reports/generate-reports.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ViewNeighborsComponent } from './pages/view-neighbors/view-neighbors.component';
import { ViewNeighborComponent } from './pages/view-neighbor/view-neighbor.component';

const routes: Routes = [
  { path: '',
    component: LayoutAdminUsersComponent,
    children: [
      {
        path: 'Crear-usuario',
        component: CreateUsersComponent,
        canActivate: [Access345Guard]
      },
      {
        path: 'editar-usuario/:id',
        component: EditUserComponent,
        canActivate: [Access345Guard]
      },
      {
        path: 'usuarios',
        component: ViewUsersComponent,
        canActivate: [Access345Guard]
      },
      {
        path: 'ver-usuario/:id',
        component:ViewUserComponent,
        canActivate: [Access345Guard]
      },
      {
        path:'roles',
        component:RolesComponent,
        canActivate: [Access45Guard]
      },
      {
        path:'agregar-rol',
        component:AddRoleComponent,
        canActivate: [Access45Guard]
      },
      {
        path:'editar-rol/:id',
        component:EditRoleComponent,
        canActivate: [Access45Guard]
      },
      {
        path: 'vecinos',
        component: ViewNeighborsComponent,
        canActivate: [Access45Guard]
      },
      {
        path: 'vecino',
        component: ViewNeighborComponent,
        canActivate: [Access45Guard]
      },
      {
        path: 'reportes',
        component: GenerateReportsComponent,
        canActivate: [Access45Guard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
