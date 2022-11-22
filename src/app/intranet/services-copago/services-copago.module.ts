import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesCopagoRoutingModule } from './services-copago-routing.module';
import { LayoutCopagoComponent } from './layouts/layout-copago/layout-copago.component';
import { HealthCoverageComponent } from './pages/health-coverage/health-coverage.component';
import { SimulationDataComponent } from './pages/simulation-data/simulation-data.component';
import { CopaymentSimulatorComponent } from './pages/copayment-simulator/copayment-simulator.component';
import { CancelSimulationComponent } from './pages/cancel-simulation/cancel-simulation.component';
import { YourCertificatesComponent } from './pages/your-certificates/your-certificates.component';


@NgModule({
  declarations: [
    LayoutCopagoComponent,
    HealthCoverageComponent,
    SimulationDataComponent,
    CopaymentSimulatorComponent,
    CancelSimulationComponent,
    YourCertificatesComponent,
  ],
  imports: [
    CommonModule,
    ServicesCopagoRoutingModule
  ]
})
export class ServicesCopagoModule { }
