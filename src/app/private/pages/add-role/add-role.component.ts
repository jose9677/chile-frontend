import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  public roles: any;
  public isFormSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.isFormSubmitted = false;

    this.roles= this.fb.group({
      rol: ['',[Validators.required]],
    })
  }
  agregarRol(e: Event){

  }
}
