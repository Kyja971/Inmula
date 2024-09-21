import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabAuthPageRoutingModule } from './tab-auth-routing.module';
import { TabAuthPage } from './tab-auth.page';
import { SharedModule } from '../shared/shared.module';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { ShowOneAuthComponent } from './show-one-auth/show-one-auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAuthPageRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [TabAuthPage, AddAccountComponent, ShowOneAuthComponent]
})
export class TabAuthPageModule {}
