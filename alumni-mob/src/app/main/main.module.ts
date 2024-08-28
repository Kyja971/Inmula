import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogoutComponent } from '../logout/components/logout.component';
import { headerInternComponent } from '../tab2/headerIntern/headerIntern.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogoutComponent, headerInternComponent, HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [LogoutComponent, headerInternComponent, HeaderComponent]
})
export class MainModule { }
