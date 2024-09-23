import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyApplicationStatusPageRoutingModule } from './my-application-status-routing.module';

import { MyApplicationStatusPage } from './my-application-status.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyApplicationStatusPageRoutingModule,
    SharedModule
  ],
  declarations: [MyApplicationStatusPage]
})
export class MyApplicationStatusPageModule {}
