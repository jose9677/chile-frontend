import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApsManagementService } from '../../shared/services/aps-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aps-update',
  templateUrl: './aps-update.component.html',
  styleUrls: ['./aps-update.component.scss']
})
export class ApsUpdateComponent implements OnInit {

  public isFormSubmitted: boolean;
  public isFormatinvalid: boolean;

  public today: any;

  public updateApsForm: any = this.fb.group({
    generationDate: ['', [ Validators.required]],
    document: ['',[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private apsServices: ApsManagementService,
    private router: Router
  ) {
    this.isFormSubmitted = false;

    this.today = new Date();
    this.today = `${this.today.getFullYear()}-${(this.today.getMonth())+1}-${this.today.getDate()}`;
   }

  ngOnInit(): void {
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

  cancel(e: Event) {

    e.preventDefault();

    this.router.navigate(['aps/dashboard']);


  }

  updateAps(e: Event) {

    e.preventDefault();

    const data = new FormData();

    data.append('rut', sessionStorage.getItem('auth-user'));
    data.append('update_date', this.updateApsForm.value.generationDate);
    data.append('document', this.updateApsForm.value.document);


    this.apsServices.updateAps( data ).subscribe((result) => {

      console.log(result);

    },
    error => {

      console.log(error);

    },
    () => {

    })

  }

}
