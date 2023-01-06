import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-desactive',
  templateUrl: './user-desactive.component.html',
  styleUrls: ['./user-desactive.component.scss']
})
export class UserDesactiveComponent implements OnInit {

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
