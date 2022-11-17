import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorsComponent } from './visitors.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorsComponent,
    children: [
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
export class VisitorsRoutingModule { }
