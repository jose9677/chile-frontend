import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

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
