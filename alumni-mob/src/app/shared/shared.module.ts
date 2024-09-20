import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogoutComponent } from '../shared/components/logout/logout.component';
import { headerInternComponent } from '../shared/components/headerIntern/headerIntern.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [LogoutComponent, headerInternComponent, HeaderComponent, CompanyComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [LogoutComponent, headerInternComponent, HeaderComponent, CompanyComponent]
})
export class SharedModule { }
