import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'activate',
    loadChildren: () => import('./activation/activate/activate.module').then( m => m.ActivatePageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'insertcode',
    loadChildren: () => import('./activation/insertcode/insertcode.module').then( m => m.InsertcodePageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'create-password',
    loadChildren: () => import('./activation/create-password/create-password.module').then( m => m.CreatePasswordPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
