import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatesService } from '../../shared/services/dates.service';

@Component({
  selector: 'app-visitor-data',
  templateUrl: './visitor-data.component.html',
  styleUrls: ['./visitor-data.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VisitorDataComponent implements OnInit {

  @Input() data: any;

  public rutAssistant: any;

  public dataVisitor: any[];

  public image: any;

  constructor(
    public modal: NgbActiveModal,
    private dateService: DatesService
  ) {

    this.rutAssistant = '';

    this.dataVisitor =[];
   }

  ngOnInit(): void {
    this.rutAssistant = this.data;

    this.viewDataVisitor( this.rutAssistant );
  }

  viewDataVisitor( rutAssistant: any) {

    this.dateService.detailsVisitor( rutAssistant ).subscribe((result) => {
      this.dataVisitor = result;
      return
    })
  }

}
