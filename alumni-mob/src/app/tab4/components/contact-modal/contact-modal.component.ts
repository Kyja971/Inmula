import { Component, Input, OnInit } from '@angular/core';
import { IonSegmentButton, ModalController, SegmentChangeEventDetail } from '@ionic/angular';
import { CompanyContactComponent } from '../company-contact/company-contact.component';
import { CompanyApproachComponent } from '../company-approach/company-approach.component';
import { CompanyRelatedDatas } from 'src/app/core/types/company-related-datas/company-related-datas.type';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { EmploymentService } from 'src/app/core/services/employment.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  segmentValue = '';
  companyContact: CompanyContactComponent = new CompanyContactComponent();
  companyApproach: CompanyApproachComponent = new CompanyApproachComponent();

  @Input()
  contact?: CompanyRelatedDatas

  @Input()
  companyId!: number

  constructor(
    private _formBuilder: FormBuilder,
    private _modalCtrl : ModalController,
    private _employmentService : EmploymentService

  ) {}

  ngOnInit() {
      this.formGroup = this._formBuilder.group({
        lastname: [`${this.contact?.lastname ? this.contact.lastname : ''}`],
        firstname: [`${this.contact?.firstname ? this.contact.firstname : ''}`],
        tel: [`${this.contact?.tel ? this.contact.tel : ''}`],
        mail: [`${this.contact?.mail ? this.contact.mail : ''}`],
        function: [`${this.contact?.function ? this.contact.function : ''}`],
        contacts: [`${this.contact?.contacts ? this.contact.contacts : ''}`],
        history: [`${this.contact?.history ? this.contact.history : ''}`],
        firstContact: [`${this.contact?.firstContact ? this.contact.firstContact : ''}`],
        lastContact: [`${this.contact?.lastContact ? this.contact.lastContact : ''}`],
        nextContact: [`${this.contact?.nextContact ? this.contact.nextContact : ''}`],
      })
    ;
  }

  saveDatas() {

    const newContact: CompanyRelatedDatas = {
      lastname: this.formGroup.value.lastname,
      firstname: this.formGroup.value.firstname,
      tel: this.formGroup.value.tel,
      mail: this.formGroup.value.mail,
      function: this.formGroup.value.function,
      contacts: this.formGroup.value.contacts,
      history: this.formGroup.value.history,
      firstContact: this.formGroup.value.firstContact,
      lastContact: this.formGroup.value.lastContact,
      nextContact: this.formGroup.value.nextContact,
    }
    console.log("je vais send ces infos: ", this.companyId)
    this._employmentService.saveContact(newContact, this.companyId)

    this._modalCtrl.dismiss()
  }

  dismiss() {
    this._modalCtrl.dismiss()
    }

  completeContactInformation() {}

  // setCompanyContact() {
  //   //console.log(this._segment.value, 'initial Value')
  //   if (this.segmentValue !== 'contact') {
  //     this.segmentValue === 'contact'
  //     console.log('change segmentValue to contact')
  //   }
  // }

  // setCompanyApproach() {
  //   //console.log(this._segment.value, 'initial Value')
  //   if (this.segmentValue !== 'approach') {
  //     this.segmentValue === 'approach'
  //     console.log('changed segmentValue to approach')
  //   }
  // }
}
