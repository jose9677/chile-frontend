import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalsService } from '../../../../shared/sevices/modals.service';
import { ModalComponent } from '../../shared/modals/modal/modal.component';
import { EnterRutComponent } from '../enter-rut/enter-rut.component';
import { RecoveryComponent } from '../recovery/recovery.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errors: any = null;

  returnUrl: any;

  public isFormSubmitted: Boolean;

  public userLogin = this.fb.group({
    rut: ['', Validators.required],
    password: ['', Validators.required]
    })


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalsService,
    private fb: FormBuilder

    ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isFormSubmitted = false;
  }

  modalRut() {
    this.modalService.openModal(EnterRutComponent);
  }

  modalRecovery() {
    this.modalService.openModal(RecoveryComponent);
  }


  onLoggedin(e: Event) {
    console.log(this.userLogin)
    this.isFormSubmitted = true;
    e.preventDefault();
    if(!this.userLogin.invalid) {
      localStorage.setItem('isLoggedin', 'true');
      this.router.navigate([this.returnUrl]);
    }else{
      localStorage.clear();
      this.errors = true;
      let title: string = 'Error Login'
      let message: string = "El Usuario No Puede Iniciar sesion";
      this.modalService.OpenModalError2(ModalComponent, this.errors, title, message);

    }
  }

}
