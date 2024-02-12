import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EvaluateChangesService } from '../../shared/services/evaluate-changes.service';

@Component({
  selector: 'app-approval-changes-user',
  templateUrl: './approval-changes-user.component.html',
  styleUrls: ['./approval-changes-user.component.scss']
})
export class ApprovalChangesUserComponent implements OnInit {

  @Input() originalData: any;
  @Input() modifiedData: any;
  @Input() rutEmployee: any;

  public authorizedEdit: boolean;

  constructor(
    private evaluateChangesService: EvaluateChangesService
  ) {

    this.authorizedEdit = this.evaluateChangesService.roleAuthorizedEdit;

  }

  ngOnChanges(changes: SimpleChanges) {


    if( changes.modifiedData) {

      this.modifiedData = changes.modifiedData.currentValue;
    }


    if( changes.originalData ) {

      this.originalData = changes.originalData.currentValue;
    }

  }

  ngOnInit(): void {



    // this.evaluateChangesService.refresh$;
  }

  approveChanges( e: Event) {

    e.preventDefault();

    this.evaluateChangesService.approveChangesDataUser(this.modifiedData.id_user, this.originalData.rut).subscribe((res) => {

    },
    errors => {

    },
    () => {

    })
  }

  rejectChanges( e: Event) {

    e.preventDefault();

    this.evaluateChangesService.rejectChangesDataUser( this.modifiedData.id_user, this.originalData.rut ).subscribe((res) => {

    },
    errors => {

    },
    () => {

    })

  }

  updateChanges( e: Event) {

    e.preventDefault();

    if (this.modifiedData.approve) {

      this.modifiedData.names = this.modifiedData.names === null ? this.originalData.names : this.modifiedData.names;
      this.modifiedData.lastnames = this.modifiedData.lastnames === null ? this.originalData.lastnames : this.modifiedData.lastnames;
      this.modifiedData.id_sex = this.modifiedData.id_sex === null ? this.originalData.id_sex : this.modifiedData.id_sex;
      this.modifiedData.f_nac = this.modifiedData.f_nac === null ? this.originalData.f_nac : this.modifiedData.f_nac;
      this.modifiedData.email = this.modifiedData.email === null ? this.originalData.email : this.modifiedData.email;
      this.modifiedData.landline = this.modifiedData.landline === null ? this.originalData.landline : this.modifiedData.landline;
      this.modifiedData.mobile_phone =  this.modifiedData.mobile_phone === null ? this.originalData.mobile_phone : this.modifiedData.mobile_phone;

    }

    const personalData = {
      "rut": this.modifiedData.rut,
      "names": this.modifiedData.names,
      "lastname": this.modifiedData.lastname,
      "id_sex": this.modifiedData.id_sex,
      "f_nac": this.modifiedData.f_nac,
      "email": this.modifiedData.email,
      "landline": this.modifiedData.landline,
      "mobile_phone": this.modifiedData.mobile_phone,
      "rut_employee": JSON.parse(sessionStorage.getItem('auth-user'))
    }

    this.evaluateChangesService.updateModifiedDataUser( this.modifiedData.rut, personalData ).subscribe((res) => {

    },
    errors => {

    },
    () => {

    })

  }

  edit(e: Event) {

    e.preventDefault();
    this.evaluateChangesService.changeEditingPersonalData(true);
  }

}
