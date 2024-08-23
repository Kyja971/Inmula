import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { MainModule } from '../main/main.module';
import { InternsComponent } from './interns/interns.component';
import { ProfilePagePage } from './profile/profile-page/profile-page.page';
import { ProfilePagePageModule } from './profile/profile-page/profile-page.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    MainModule,
    ProfilePagePageModule
  ],
  declarations: [Tab2Page, InternsComponent]
})
export class Tab2PageModule {}
