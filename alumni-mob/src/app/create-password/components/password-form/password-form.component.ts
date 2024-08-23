/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatePasswordService } from '../../services/validate-password.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent  implements OnInit {

  public validatePassword: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _service: ValidatePasswordService,
    private _toastController: ToastController,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.validatePassword = this._formBuilder.group({
      password1: [
        '', // Default value for the control
        [Validators.required],
      ],
      password2: [
        '', // Default value for the control
        [Validators.required],
      ],
    });
  }


  onSubmit(): void {
    this._service
      .doValidate(this.validatePassword.value)
      .pipe(take(1))
      .subscribe({
        next: async (response: HttpResponse<any>) => {
          if (response.status === 200) {
            //this._storage.store('auth',response.body.token)
            const toast = await this._toastController.create({
              message: "Mot de passe crée, redirection vers la page de login",
              duration: 5000,
              position: 'middle',
              buttons: [
                {
                  text: 'Valider',
                },
              ],
            });
            await toast.present();
            toast.onWillDismiss().then(() => this._router.navigate(['login']));
          } else {
            const toast = await this._toastController.create({
              message: response.body.message,
              duration: 5000,
              position: 'middle',
              buttons: [
                {
                  text: 'Réessayer',
                },
              ],
            });
            await toast.present();
            toast.onWillDismiss().then(() => this.validatePassword.reset());
          }
        },
        error: (error: any) => {
          console.log(`ko, je dois afficher un toast ${JSON.stringify(error)}`);
        },
      });
  }
}
