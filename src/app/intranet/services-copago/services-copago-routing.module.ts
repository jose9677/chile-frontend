import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        component: HealthCoverageComponent
      },
      {
        path: 'datos-de-simulacion',
        component: SimulationDataComponent
      },
      {
        path: 'simulador-de-copago',
        component: CopaymentSimulatorComponent
      },
      {
        path: 'cancelar-Simulación',
        component: CancelSimulationComponent
      },
      {
        path: 'sus-certificados',
        component: YourCertificatesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesCopagoRoutingModule { }
