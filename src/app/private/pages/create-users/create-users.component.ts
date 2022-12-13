import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { AuthService } from 'src/app/public/auth/shared/services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateService } from '../../share/services/private.service';




@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUsersComponent implements OnInit {

  public errors: any = null;

  public isFormSubmitted: boolean;

  public userRegister: any;

  public selectedStreet: any = null;

  public selectedSupervisorStreet: any = null;

  public RolOfstreet: any[]= [];

  public supervisorOfstreet: any[]= [];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalsService,
    private authServices: AuthService,
    private privateService:PrivateService,
    private routerQuery: ActivatedRoute,
    // public modalService3: NgbActiveModal, da ERROR y la pantalla se vuelve loca
    private modalService2: ModalsService,
  ) {
    this.RolOfstreet = [
      {
        'id': 1 ,
        'name': 'rol 1'
      },
      {
        'id': 2,
        'name': 'rol 2'
      }
    ];
    this.supervisorOfstreet =[
      {
        'id':1,
        'name':'pedro'
      },
      {
        'id':2,
        'name':'juan'
      }
    ]
  }

  ngOnInit(): void {

    this.isFormSubmitted = false;

    this.userRegister= this.fb.group({
      names: ['',[Validators.required, ]],
      rutUser: ['',[Validators.required]],
      lastNames: ['', [Validators.required, ]],
      datesBirth: ['', [Validators.required, CustomValidators.date]],
      email: ['', [Validators.required, CustomValidators.email]],
      landLine: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      mobilePhone: ['', [Validators.required, Validators.minLength(9), CustomValidators.number]],
      RolOfstreet: ['', Validators.required],
      supervisorOfstreet:['', Validators.required]

    })

    this.privateService.roles().subscribe(dataRequest => {

      console.log(dataRequest)



    })

  }
  onRegister(e: Event){
    console.log(this.userRegister);
    const dataUser ={
      rut:this.userRegister.value.rutUser,
      names:this.userRegister.value.names,
      lastnames:this.userRegister.value.lastNames,
      datesbirth:this.userRegister.value.datesBirth,
      emails:this.userRegister.value.email,
      landline:this.userRegister.value.landLine,
      mobilephone:this.userRegister.value.mobilePhone,
      rolOfstreet:this.userRegister.value.RolOfstreet,
      supervisorofstreet:this.userRegister.value.supervisorOfstreet
    }
    console.log(dataUser);
    this.authServices.register(dataUser).subscribe(result => {
      console.log(result);
    },
    error => {
      this.errors=error;
      console.log('errors_login->',this.errors);
      if( this.errors == '{"email":["The email has already been taken."]}'){
        let title= "";
        let message = "El correo electrónico que introdujo ya se encuentra asociado a otro usuario. Por favor verifique e intente nuevamente";
        this.modalService.OpenModalError2(ModalComponent, true, title, message);
      }
      this.isFormSubmitted = true;

    },
    () => {
      e.preventDefault();
      this.router.navigate(['privado/Crear-usuario']);
      this.isFormSubmitted = false;

    });
  }
  confirmRut(e: Event){
    const dataRutUser= {
      rut: this.userRegister.value.rutUser
    }

    this.authServices.validateRut(dataRutUser).subscribe( result => {
      console.log(result)
    },
    error => {  //recibe error del user services
      this.errors= true;
      let title: string = "Rut Incorrecto"
      let message = "El Rut ingresado no es correcto, por favor verifique y vuelva a intentarlo";
      this.modalService2.OpenModalError2(ModalComponent, this.errors, title, message);


    },
    () => {
      this.onRegister(e)
      // this.modalService3.close()
      // this.router.navigate(['/privado/Crear-usuario'], { queryParams: { rut: this.userRegister.value.rutUser } });


    });
  }
}
