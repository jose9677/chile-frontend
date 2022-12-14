import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { DatesService } from '../../../shared/services/dates.service';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RejectRequestComponent implements OnInit {

  @Input() data: any; data2: any;  

  

  constructor(
    public modalService: NgbActiveModal,
    private modalsService:ModalsService,
    private datesService: DatesService,
    private router: Router
  ) { 
    
    
  }
  
  ngOnInit(): void {
    
  }
  
  confirmDeny (e: Event) {
    e.preventDefault();   
    
    this.datesService.approbe(this.data2, this.data).subscribe((result) => {
      
      console.log(result);
      
    },

    error => {

      console.log(error);
      
    },
    () => {

      
      let error = true;
      let title= "Solicitud Rechazada";
      let message = "La Solicitud fue fue Rechazada";
      this.modalsService.OpenModalError2(ModalComponent, error, title, message);
      
      this.router.navigate(['/solicitud/asignar-cita']);
      
      this.modalService.close();


    })

  }
  

}
