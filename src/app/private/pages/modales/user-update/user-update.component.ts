import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  Cerrar(){
    this.modal.close()
    this.router.navigate(['/privado/ver-usuarios']);
  }

}
