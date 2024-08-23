/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent  implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _toastController: ToastController,
    private _router: Router,
    private _storage: StorageService
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      login: [
        '', // Default value for the control
        [Validators.required]
      ],
      password: [
        '',
        [Validators.required]
      ]
    })
  }

  onSubmit(){
    this._service.doLogin(this.form.value).pipe(
      take(1)).subscribe({
        next: async (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._storage.store('auth', response.body.token)
            this._router.navigate(['tabs', 'tab1']).then(() => this.form.reset())
          } else {
            const toast = await this._toastController.create({
              message: response.body.message,
              duration: 2000,
              position: 'middle',
              buttons: [
                {
                  text: 'Réessayer',
                }
              ]
            })
            toast.present()
            toast.onWillDismiss().then(() => this.form.reset())
          }
        },
        error: (error: any) => {
          console.log(`Non je peux pas afficher les posts ${JSON.stringify(error)}`)
        }
      })
  }
}
