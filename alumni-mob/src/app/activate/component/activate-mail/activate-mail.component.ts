import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { ActivateService } from '../../services/activate.service';

@Component({
  selector: 'app-activate-mail',
  templateUrl: './activate-mail.component.html',
  styleUrls: ['./activate-mail.component.scss'],
})
export class ActivateMailComponent  implements OnInit {

  public activateForm: FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private _service: ActivateService,
    private _toastController: ToastController,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.activateForm = this._formBuilder.group({
      email: [
        '', // Default value for the control
        [Validators.required],
      ],
    });
  }

  onSubmit(): void {
    this._service
      .doActivate(this.activateForm.value)
      .pipe(take(1))
      .subscribe({
        next: async (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log(`ok, balance le code`);
            //this._storage.store('auth',response.body.token)
            this._router.navigate(['insertcode'])
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
            toast.onWillDismiss().then(() => this.activateForm.reset());
          }
        },
        error: (error: any) => {
          console.log(`ko, je dois afficher un toast ${JSON.stringify(error)}`);
        },
      });
  }

}
