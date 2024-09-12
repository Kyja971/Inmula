/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { WsChatService } from 'src/app/core/services/ws-chat.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { TokenType } from 'src/app/core/types/token/token.type';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastController: ToastController,
    private _router: Router,
    private _storage: StorageService,
    private _wsService: WsChatService,
    private _selfInformation: SelfInformationService,
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      login: [
        '', // Default value for the control
        [Validators.required],
      ],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const payload = {
      email: this.form.value.login,
      password: this.form.value.password,
    };
    this._authService.login(payload).pipe(take(1)).subscribe({
        next: (response: TokenType) => {
          if (response.token) {
            this._storage.store('auth', response.token);
            //We try to find the internid associates to the token
            this._authService.getInternId(response).pipe(take(1)).subscribe({
              next: (id: string) => {
                //If we got an id, then we can put it in the local storage
                this._selfInformation.setPersonnal(id);
                this._authService.setRole(response);
                this._wsService.connect(id)         
              },
              error: (error: any) => {
                console.log(error)
              }
            })

            //Use to know if the user tried to access a specific url when disconnected
            const returnUrl = this._storage.retrieve("returnUrl")
            //If a specific url is in the local storage, we can redirect the user to that url
            if (returnUrl) {
              this._router.navigate([returnUrl]).then(() => {
                this._storage.remove("returnUrl")
                this.form.reset()
              });
            //if no url has been found in the local storage we can redirect him to the main page
            } else {
              this._router.navigate(['tabs', 'tab1']).then(() => {
                this.form.reset();
              });
            }
          }
        },
        error: async (error: any) => {
          const toast = await this._toastController.create({
            message: 'Echec de connexion',
            duration: 2000,
            position: 'middle',
            buttons: [
              {
                text: 'Réessayer',
              },
            ],
          });
          toast.present();
          toast.onWillDismiss().then(() => this.form.reset());
        },
      });
  }
}
