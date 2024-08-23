import { HttpResponse } from '@angular/common/http';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { ActivateService } from 'src/app/activate/services/activate.service';
import { InsertCodeService } from '../../services/insert-code.service';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss'],
})
export class ValidateCodeComponent  implements OnInit {

  code = this._service.getCode()

  public validateForm: FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private _service: InsertCodeService,
    private _toastController: ToastController,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this._formBuilder.group({
      code: [
        '', // Default value for the control
        [Validators.required],
      ],
    });
  }

  onSubmit(): void {
    this._service
      .doValidate(this.validateForm.value)
      .pipe(take(1))
      .subscribe({
        next: async (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log(`ok, code ok`);
            //this._storage.store('auth',response.body.token)
            const toast = await this._toastController.create({
              message: "Code ok, mail validé, redirection vers la création du mot de passe",
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
            toast.onWillDismiss().then(() => this.validateForm.reset());
          }
        },
        error: (error: any) => {
          console.log(`ko, je dois afficher un toast ${JSON.stringify(error)}`);
        },
      });
  }

}
