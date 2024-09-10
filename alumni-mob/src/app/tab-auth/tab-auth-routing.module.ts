import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAuthPage } from './tab-auth.page';

const routes: Routes = [
  {
    path: '',
    component: TabAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAuthPageRoutingModule {}
