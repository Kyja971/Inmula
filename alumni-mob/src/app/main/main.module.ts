import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogoutComponent } from '../logout/components/logout.component';
import { headerInternComponent } from '../tab2/headerIntern/headerIntern.component';

@NgModule({
  declarations: [LogoutComponent, headerInternComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [LogoutComponent, headerInternComponent]
})
export class MainModule { }
