import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertcodePage } from './insertcode.page';

const routes: Routes = [
  {
    path: '',
    component: InsertcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertcodePageRoutingModule {}
