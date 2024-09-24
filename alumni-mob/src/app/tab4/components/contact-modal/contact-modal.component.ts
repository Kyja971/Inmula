import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CompanyRelatedDatas } from 'src/app/core/types/company-related-datas/company-related-datas.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmploymentService } from 'src/app/core/services/employment.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  segmentValue = '';

  @Input()
  contact?: CompanyRelatedDatas

  @Input()
  companyId!: number

  constructor(
    private _formBuilder: FormBuilder,
    private _modalCtrl : ModalController,
    private _employmentService : EmploymentService,
    private _toast: ToastController

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

    this._employmentService.saveContact(newContact, this.companyId).subscribe(() => {
      this._toast
      .create({
        message: `Contact mis-à-jour avec succès`,
        duration: 1500,
        position: 'middle',
        buttons: [
          {
            text: 'Fermer',
          },
        ],
      }).then((toast) => toast.present().then(() => this._modalCtrl.dismiss())
    )})
  }

  dismiss() {
    this._modalCtrl.dismiss()
    }

  completeContactInformation() {}

}
