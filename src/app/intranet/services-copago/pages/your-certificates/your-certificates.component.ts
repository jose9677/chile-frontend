import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-certificates',
  templateUrl: './your-certificates.component.html',
  styleUrls: ['./your-certificates.component.scss']
})
export class YourCertificatesComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewCertificate(e: Event) {

    e.preventDefault();

    this.router.navigate(['copago', 'cobertura-de-salud'], {queryParams: {codeCertificate: 111111}});

  }

  downloadCertificate(e: Event) {

    e.preventDefault();

    alert('descargar certificado');
  }

}
