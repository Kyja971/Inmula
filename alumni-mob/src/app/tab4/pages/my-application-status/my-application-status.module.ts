import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyApplicationStatusPageRoutingModule } from './my-application-status-routing.module';

import { MyApplicationStatusPage } from './my-application-status.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyApplicationStatusPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [MyApplicationStatusPage, ContactModalComponent]
})
export class MyApplicationStatusPageModule {}
