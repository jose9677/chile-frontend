import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {

  type: any;
  title: any;
  desc: any;
  private sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    console.log(this.type);
    
    this.sub = this.route.data.subscribe( param => {
      if(param.type) {
        this.type = param.type;
      }
      if(param.title) {
        this.title = param.title;
      }
      if(param.desc) {
        this.desc = param.desc
      }
    });

    switch(this.type) {
      case '404':
        if (!this.title) {
          this.title = 'Página no encontrada'
        }
        if (!this.desc) {
          this.desc = 'Lo sentimos, pero la página solicitada no existe.'
        }
        break;
      case '500':
        if (!this.title) {
          this.title = 'No pudimos procesar tu petición'
        }
        if (!this.desc) {
          this.desc = 'Lo sentimos, hubo un error. Por favor intenta de nuevo más tarde.'
        }
        break;
      default:
        // if (!this.type) {
          this.type = 'Lo sentimos..';
        // }
        if (!this.title) {
          this.title = 'Algo salió mal';
        }
        if (!this.desc) {
          this.desc = 'Parece que algo salió mal.<br>' + 'estamos trabajando para solucionarlo';
        }
    }
  }

	ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
