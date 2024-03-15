import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-neighbors',
  templateUrl: './view-neighbors.component.html',
  styleUrls: ['./view-neighbors.component.scss']
})
export class ViewNeighborsComponent implements OnInit {

  @Input() data: any

  public isFormSubmitted: boolean;

  public formRutUser: any;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {



    this.formRutUser = this.fb.group({
      rutNumber: ['',[Validators.required]],
    })
  }

  correctRut(): any {

    if ((this.formRutUser.value.rutNumber != '')) {

      let rut = this.formRutUser.value.rutNumber;

      rut = rut.replace(/\-/g, "");
      rut = rut.replace(/\.|,/g, "");

      let code = rut.slice(-1);

      let correctRut: any = rut;

      if(rut.length > 1) correctRut = rut.slice(0, -1) + "-" + code;

      this.formRutUser.controls['rutNumber'].setValue(correctRut);

    }

  }

  searchRut(e: Event) {

    this.isFormSubmitted = true;

    if (this.formRutUser.status === 'VALID') {

      this.router.navigate(
        ['seguridad/vecino'],
        {queryParams: {rut: this.formRutUser.value.rutNumber}}
      );

    }
  }

}
