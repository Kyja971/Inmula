import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmploymentService } from 'src/app/core/services/employment.service';
import { CompanyItemsType } from 'src/app/core/types/ft-company/company-items.type';

@Component({
  selector: 'app-present-company',
  templateUrl: './present-company.component.html',
  styleUrls: ['./present-company.component.scss'],
})
export class PresentCompanyComponent  implements OnInit {

  @Input()
  company!: CompanyItemsType


  constructor(private modalCtrl: ModalController,
    private employmentService: EmploymentService
  ) { }

  ngOnInit() {
 
  }

  addCompanyToArray(){
    this.employmentService.storeCompanyId(this.company.id)
  }

  dismissModal() {
    this.modalCtrl.dismiss()
  }
}
