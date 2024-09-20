import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyApplicationStatusPage } from './my-application-status.page';

const routes: Routes = [
  {
    path: '',
    component: MyApplicationStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyApplicationStatusPageRoutingModule {}
