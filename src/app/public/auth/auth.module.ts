import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalComponent } from './shared/modals/modal/modal.component';
import { EnterRutComponent } from './pages/enter-rut/enter-rut.component';
import { ModalsService } from '../../shared/sevices/modals.service';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ValidateEmailComponent } from './pages/validate-email/validate-email.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  },
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent, ForgetPasswordComponent,
    ModalComponent,
    EnterRutComponent,
    RecoveryComponent,
    ValidateEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    ModalsService,
  ]
})
export class AuthModule { }
