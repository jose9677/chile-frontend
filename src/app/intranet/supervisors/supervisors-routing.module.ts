import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignRequestFormComponent } from './requests/assign-request-form/assign-request-form.component';
import { RequestsComponent } from './requests/requests.component';
import { SupervisorsComponent } from './supervisors.component';

const routes: Routes = [
  {
    path: '',
    component: SupervisorsComponent,
    children: [
      {
        path: 'requests',
        component: RequestsComponent
      },
      {
        path: 'assign-request-form',
        component: AssignRequestFormComponent
      },
      // {
      //   path: '',
      //   redirectTo: 'login',
      //   pathMatch: 'full'
      // },
      // {
      //   path: 'nombre ruta',
      //   component: Nombre del Componente
      // },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorsRoutingModule { }
