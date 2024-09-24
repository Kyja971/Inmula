import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { SharedModule } from '../shared/shared.module';
import { PresentCompanyComponent } from './components/present-company/present-company.component';
import { MyApplicationStatusPage } from './pages/my-application-status/my-application-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab4Page, PresentCompanyComponent, MyApplicationStatusPage],
})
export class Tab4PageModule {}
