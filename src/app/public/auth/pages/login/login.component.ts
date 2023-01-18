import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { ModalsService } from '../../../../shared/services/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { EnterRutComponent } from '../enter-rut/enter-rut.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errors: any = null;

  public rutUser: any;

  returnUrl: any;

  public isFormSubmitted: boolean;

  public listDigit: any;

  public rutNumber: any;

  public userLogin: any;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalsService,
    private fb: FormBuilder,
    private authService: AuthService,
    private loggedService: LoggedService,
    private tokenService: TokenService

    ) {

      this.rutNumber = "";

      this.userLogin = this.fb.group({
        rutNumber: [this.rutNumber, Validators.required],
        password: ['', Validators.required]
        })
    }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isFormSubmitted = false;

  }

  modalRut() {
    this.modalService.openModal(EnterRutComponent);
  }

  modalRecovery() {
    this.modalService.openModal(ForgetPasswordComponent);
  }


  onLoggedin(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    const dataLogin = {
      rut: this.userLogin.value.rutNumber,
      password: this.userLogin.value.password
    }
    // window.sessionStorage.setItem('auth-user', JSON.stringify(dataLogin.rut));
    if (this.isFormSubmitted && this.userLogin.status == "VALID" ) {

      this.authService.login(dataLogin).subscribe(result => {
        console.log(result)

      },
      error => {  //recibe error del user services
        sessionStorage.clear();
        this.errors = error;
        console.log('errors_login->',this.errors.message);
        // modal

          this.userLogin.reset();

          this.errors = true;
          let title: string = ''
          let message: string = "Usuario o contraseña incorrectos , por favor verifique e intente nuevamente";
          this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);


        },
        () => {
          this.isFormSubmitted = false;


          console.log(this.userLogin)
          this.router.navigate([this.returnUrl]);

          this.loggedService.changeLoggedStatus =true;
          // window.sessionStorage.setItem("isLogged", JSON.stringify(true));



        });
    }

  }

  correctRut(): any {
    if (( !this.userLogin.value.rutNumber.includes("-"))) {

      let rut = this.userLogin.value.rutNumber;

      let code = rut.slice(-1)

      let correctRut = rut.slice(0, -1) + "-" + code;

      this.rutNumber = correctRut;

    }
  }

}
