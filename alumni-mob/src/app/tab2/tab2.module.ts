import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { InternsComponent } from './interns/interns.component';
import { ProfilePagePageModule } from './profile/profile-page/profile-page.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateProfileComponent } from './profile/components/update-profile.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    SharedModule,
    ProfilePagePageModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page, InternsComponent, UpdateProfileComponent]
})
export class Tab2PageModule {}
