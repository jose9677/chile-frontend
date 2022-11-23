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
        path: 'create-users',
        component: CreateUsersComponent
      },
      {
        path: 'edit-user',
        component: EditUserComponent
      },
      {
        path: 'view-users',
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
