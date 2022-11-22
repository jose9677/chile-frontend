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
        path: 'Health-Coverage',
        component: HealthCoverageComponent
      },
      {
        path: 'Simulation-Data',
        component: SimulationDataComponent
      },
      {
        path: 'Copayment-simulator',
        component: CopaymentSimulatorComponent
      },
      {
        path: 'Cancel-Simulation',
        component: CancelSimulationComponent
      },
      {
        path: 'Your-Certificates',
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
