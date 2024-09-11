/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { take } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent  implements OnInit {

  public validatePassword: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastController: ToastController,
    private _router: Router,
    private _storageService: StorageService
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


  async onSubmit(): Promise<void> {
    if(this.validatePassword.value.password1 === this.validatePassword.value.password2){
      let payload = {
        password: this.validatePassword.value.password1
      }
      this._authService.insertPassword(payload).pipe(take(1)).subscribe(async () => {
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
        this._storageService.remove("authId")
        this._storageService.remove("email")
        toast.onWillDismiss().then(() => this._router.navigate(['login']));
      })
    } else {
      const toast = await this._toastController.create({
        message: "Les mots de passes doivent être identiques",
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
  }
}
