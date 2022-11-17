import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeighborComponent } from './neighbor.component';
import { CreateRequestComponent } from './page/create-request/create-request.component';

const routes: Routes = [
  {
    path: '',
    component: NeighborComponent,
    children: [
      {
        path: 'create-request',
        component: CreateRequestComponent
      },
      // {
      //   path: '',
      //   redirectTo: 'login',
      //   pathMatch: 'full'
      // },
      // {
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
export class NeighborRoutingModule { }
