import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-created',
  templateUrl: './user-created.component.html',
  styleUrls: ['./user-created.component.scss']
})
export class UserCreatedComponent implements OnInit {

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
