import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ServicesCopagoRoutingModule } from './services-copago-routing.module';
import { LayoutCopagoComponent } from './layouts/layout-copago/layout-copago.component';
import { HealthCoverageComponent } from './pages/health-coverage/health-coverage.component';
import { SimulationDataComponent } from './pages/simulation-data/simulation-data.component';
import { CopaymentSimulatorComponent } from './pages/copayment-simulator/copayment-simulator.component';
import { CancelSimulationComponent } from './pages/cancel-simulation/cancel-simulation.component';
import { YourCertificatesComponent } from './pages/your-certificates/your-certificates.component';
import { AddServicesComponent } from './pages/add-services/add-services.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    LayoutCopagoComponent,
    HealthCoverageComponent,
    SimulationDataComponent,
    CopaymentSimulatorComponent,
    CancelSimulationComponent,
    YourCertificatesComponent,
    AddServicesComponent,
  ],
  imports: [
    CommonModule,
    ServicesCopagoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class ServicesCopagoModule { }
