import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyApplicationStatusPageRoutingModule } from './my-application-status-routing.module';

import { MyApplicationStatusPage } from './my-application-status.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component';
import { CompanyContactComponent } from '../../components/company-contact/company-contact.component';
import { CompanyApproachComponent } from '../../components/company-approach/company-approach.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyApplicationStatusPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [MyApplicationStatusPage, ContactModalComponent, CompanyContactComponent, CompanyApproachComponent]
})
export class MyApplicationStatusPageModule {}
