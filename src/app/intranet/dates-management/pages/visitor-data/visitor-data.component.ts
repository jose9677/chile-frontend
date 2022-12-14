import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visitor-data',
  templateUrl: './visitor-data.component.html',
  styleUrls: ['./visitor-data.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VisitorDataComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
