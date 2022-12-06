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
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ValidateEmailComponent } from './pages/validate-email/validate-email.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { TermsAndConditionsComponent } from './pages/register/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/register/privacy-policy/privacy-policy.component';
import { WithoutSaveGuard } from 'src/app/shared/guards/without-save.guard';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [CheckLoginGuard]
      },
      {
        path: 'recuperar-contraseña',
        component: ForgetPasswordComponent
      },
      {
        path: 'registro',
        component: RegisterComponent,
        canDeactivate: [WithoutSaveGuard]
      },
      {
        path: 'cambiar-contrasena',
        component: RecoveryComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
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
    ValidateEmailComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes),

  ],
  providers: [
    ModalsService,
  ]
})
export class AuthModule { }
