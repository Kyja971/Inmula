import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePasswordPageRoutingModule } from './create-password-routing.module';

import { CreatePasswordPage } from './create-password.page';
import { RouterModule } from '@angular/router';
import { PasswordFormComponent } from './components/password-form/password-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePasswordPageRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [CreatePasswordPage, PasswordFormComponent]
})
export class CreatePasswordPageModule {}
