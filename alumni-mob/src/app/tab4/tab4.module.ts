import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { JobComponent } from './components/job.component';
import { SharedModule } from '../shared/shared.module';
import { PresentCompanyComponent } from './components/present-company/present-company.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [Tab4Page, PresentCompanyComponent]
})
export class Tab4PageModule {}
