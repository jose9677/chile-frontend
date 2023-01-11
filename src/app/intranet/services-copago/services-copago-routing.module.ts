import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Access1Guard } from 'src/app/shared/guards/access-1.guard';
import { LayoutCopagoComponent } from './layouts/layout-copago/layout-copago.component';
import { CancelSimulationComponent } from './pages/cancel-simulation/cancel-simulation.component';
import { CopaymentSimulatorComponent } from './pages/copayment-simulator/copayment-simulator.component';
import { HealthCoverageComponent } from './pages/health-coverage/health-coverage.component';
import { SimulationDataComponent } from './pages/simulation-data/simulation-data.component';
import { YourCertificatesComponent } from './pages/your-certificates/your-certificates.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutCopagoComponent,
    children: [
      {
        path: 'cobertura-de-salud',
        component: HealthCoverageComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'datos-de-simulacion',
        component: SimulationDataComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'simulador-de-copago',
        component: CopaymentSimulatorComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'cancelar-Simulación',
        component: CancelSimulationComponent,
        canActivate: [Access1Guard]
      },
      {
        path: 'sus-certificados',
        component: YourCertificatesComponent,
        canActivate: [Access1Guard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesCopagoRoutingModule { }
