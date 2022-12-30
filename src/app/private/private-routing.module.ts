import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LayoutAdminUsersComponent } from './pages/layouts/layout-admin-users/layout-admin-users.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';

const routes: Routes = [
  { path: '',
    component: LayoutAdminUsersComponent,
    children: [
      {
        path: 'Crear-usuario',
        component: CreateUsersComponent
      },
      {
        path: 'editar-usuario/:id',
        component: EditUserComponent
      },
      {
        path: 'ver-usuarios',
        component: ViewUsersComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
