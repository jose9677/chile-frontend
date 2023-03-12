import { Component, OnInit } from '@angular/core';
import { PrivateService } from '../../share/services/private.service';

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.component.html',
  styleUrls: ['./generate-reports.component.scss']
})
export class GenerateReportsComponent implements OnInit {

  constructor(
    private privateService: PrivateService
  ) { }

  ngOnInit(): void {
  }

  downloadReport1(e:Event) {

    e.preventDefault;

    this.privateService.downloadReport1();
  }

  downloadReport2(e:Event) {

    e.preventDefault;

    this.privateService.downloadReport2();
  }

}
