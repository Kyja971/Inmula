/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { WsChatService } from 'src/app/core/services/ws-chat.service';
import { SocketConnectionType } from 'src/app/core/types/socket-connection/socket-connection.type';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { TokenType } from 'src/app/core/types/token/token.type';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _toastController: ToastController,
    private _router: Router,
    private _storage: StorageService,
    private _wsService: WsChatService,
    private _selfInformation: SelfInformationService
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
    this._service
      .login(payload)
      .pipe(take(1))
      .subscribe({
        next: async (response: TokenType) => {
          if (response.token) {
            this._storage.store('auth', response.token);
            this._selfInformation.setPersonnal(response.token);
            this._router.navigate(['tabs', 'tab1']).then(() => {
            this.form.reset();
            /**
             * Si l'on a configuré le service afin de pouvoir permettre l'envoi d'un payload
             * à l'intérieur du message de connection au Socket,
             * alors connect() prend un argument, le userId,
             * et le code ressemblera alors à ceci:
             * this._wsService.connect(userId)
             * Il faudrait alors supprimer le second aller vers le socket pour simplifier
             */
            this._wsService.connect(this._selfInformation.retrievePersonnal())         
            });
          } else {
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
          }
        },
        error: (error: any) => {
          console.log(
            `Non je peux pas afficher les posts ${JSON.stringify(error)}`
          );
        },
      });
  }
}
