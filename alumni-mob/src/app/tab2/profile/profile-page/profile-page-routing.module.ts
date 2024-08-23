import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePagePage } from './profile-page.page';
import { Tab2Page } from '../../tab2.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: ProfilePagePage
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePagePageRoutingModule {}
