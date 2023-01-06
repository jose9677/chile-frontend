import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-active',
  templateUrl: './user-active.component.html',
  styleUrls: ['./user-active.component.scss']
})
export class UserActiveComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  Cerrar(){
    this.modal.close()
  }
}
