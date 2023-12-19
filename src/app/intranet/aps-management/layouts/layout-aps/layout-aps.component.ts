import { Component, OnInit } from '@angular/core';
import { ApsManagementService } from '../../shared/services/aps-management.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-aps',
  templateUrl: './layout-aps.component.html',
  styleUrls: ['./layout-aps.component.scss']
})
export class LayoutApsComponent implements OnInit {

  public viewTitle: Observable<string>;

  constructor(
    private apsServices : ApsManagementService
  ) {
    this.viewTitle = this.apsServices.viewTitleObservable;
   }

  ngOnInit(): void {
  }

}
