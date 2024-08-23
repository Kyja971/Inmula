import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertcodePageRoutingModule } from './insertcode-routing.module';

import { InsertcodePage } from './insertcode.page';
import { ValidateCodeComponent } from './component/validate-code/validate-code.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertcodePageRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [InsertcodePage, ValidateCodeComponent]
})
export class InsertcodePageModule {}
