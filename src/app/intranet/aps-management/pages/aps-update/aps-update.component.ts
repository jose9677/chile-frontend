import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApsManagementService } from '../../shared/services/aps-management.service';
import { Router } from '@angular/router';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-aps-update',
  templateUrl: './aps-update.component.html',
  styleUrls: ['./aps-update.component.scss']
})
export class ApsUpdateComponent implements OnInit {

  public isFormSubmitted: boolean;
  public isFormatinvalid: boolean;
  public isSelectFile: boolean;
  public IsUpdateNewList: boolean;


  public today: any;

  public updateApsForm: any = this.fb.group({
    generationDate: ['', [ Validators.required]],
    document: ['',[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private apsServices: ApsManagementService,
    private router: Router,
    private modalService: ModalsService,
    private spinnerService: SpinnerService
  ) {

    this.isFormSubmitted = false;
    this.isSelectFile = false;

    this.today = new Date();
    this.today = `${this.today.getFullYear()}-${(this.today.getMonth())+1}-${this.today.getDate()}`;
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.apsServices.newViewTitle = 'Actualizar listado APS';
    })


  }

  selectDataFile(event: any): void {

    let  file = <File>event.target.files[0];

    console.log(file);


    this.updateApsForm.controls['document'].reset();

    if ( file != undefined ) {

      if ( (file.type == "application/vnd.ms-excel" || file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) && file.size < 50000000)  {

        this.updateApsForm.controls['document'].setValue(file);

        this.isFormatinvalid =false;

      }else{

        this.isFormatinvalid =true;

      }

    } else {

      this.isFormatinvalid = false;
      this.updateApsForm.controls['document'].reset();

    }

    console.log(this.updateApsForm.value)

  }

  selectFile(){
    this.isSelectFile = true;
  }

  cancel(e: Event) {

    e.preventDefault();

    this.router.navigate(['aps/dashboard']);


  }

  updateAps(e: Event) {

    e.preventDefault();

    this.isFormSubmitted = true;

    if( this.updateApsForm.status === 'VALID') {

      const data = new FormData();

      data.append('rut', JSON.parse(sessionStorage.getItem('auth-user')));
      data.append('update_date', this.updateApsForm.value.generationDate);
      data.append('document', this.updateApsForm.value.document);

      setTimeout(()=>{

        console.log('proceso');
        this.apsServices.isUpdateNewList= true;
        this.spinnerService.hide();
        this.apsServices.updateAps( data ).subscribe((result) => {

          console.log(result);

        },
        error => {
          this.apsServices.isUpdateNewList= false;

          if(window.sessionStorage.getItem('isLoggedin')) {

            let isError= true;
            let title= "";
            let message = 'No se pudo realizar la actualización del listado APS';
            this.modalService.OpenModalError2(ModalComponent, isError, title, message);
            console.log(error);
          }
        },
        () => {
          this.apsServices.isUpdateNewList= false;
          if(window.sessionStorage.getItem('isLoggedin')) {
            let isError= false;
            let title= "Actualización Completada";
            let message = 'Se ha actualizado la lista de APS de forma exitosa';
            this.modalService.OpenModalError2(ModalComponent, isError, title, message);
          }
        })
      })

      setTimeout(()=> {
        console.log('salto')
        this.router.navigate(['aps/dashboard'])
      }, 5000)

    }


  }
}
