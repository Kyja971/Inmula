import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompanyItemsType } from 'src/app/core/types/ft-company/company-items.type';
import { FTCompanyType } from 'src/app/core/types/ft-company/ft-company.type';
import { PresentCompanyComponent } from 'src/app/tab4/components/present-company/present-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent  implements OnInit {

  public JSONString = JSON

  @Input()
  company!: CompanyItemsType

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.company)
  }


   presentCompany(company: CompanyItemsType) {
     this._modalCtrl.create({
      component : PresentCompanyComponent,
      componentProps: {
        company : company
      }
    })
    .then((modal)=> modal.present());
  }

}
