import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyApplicationStatusPage } from './my-application-status.page';
import { CompanyContactComponent } from '../../components/company-contact/company-contact.component';
import { CompanyApproachComponent } from '../../components/company-approach/company-approach.component';

const routes: Routes = [
  {
    path: '',
    component: MyApplicationStatusPage
  },
  {
    path: 'contact',
    component: CompanyContactComponent
  },
  {
    path: 'approach',
    component: CompanyApproachComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyApplicationStatusPageRoutingModule {}
