import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivatePageRoutingModule } from './activate-routing.module';

import { ActivatePage } from './activate.page';
import { ActivateMailComponent } from './component/activate-mail/activate-mail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivatePageRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ActivatePage,ActivateMailComponent]
})
export class ActivatePageModule {}
