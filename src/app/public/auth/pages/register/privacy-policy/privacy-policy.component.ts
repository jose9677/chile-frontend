import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrivacyPolicyComponent implements OnInit {

  constructor(
    public modalService: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
