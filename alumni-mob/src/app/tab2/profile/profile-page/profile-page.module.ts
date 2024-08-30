import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePagePageRoutingModule } from './profile-page-routing.module';
import { ProfilePagePage } from './profile-page.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePagePageRoutingModule,
    SharedModule
],
  declarations: [ProfilePagePage]
})
export class ProfilePagePageModule {}
