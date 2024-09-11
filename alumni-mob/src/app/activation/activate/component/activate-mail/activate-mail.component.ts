import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-activate-mail',
  templateUrl: './activate-mail.component.html',
  styleUrls: ['./activate-mail.component.scss'],
})
export class ActivateMailComponent  implements OnInit {

  public activateForm: FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private _toastController: ToastController,
    private _router: Router,
    private _authService: AuthService,
    private _storageService: StorageService
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
    let payload = {
      email : this.activateForm.value.email
    }
    this._authService.checkMail(payload).pipe(take(1)).subscribe(async (payloadRes: {isMailValid: boolean, id: number}) => {
      if(payloadRes.isMailValid){
        this._router.navigate(['insertcode'])
        this._storageService.store('email', payload.email)
        this._storageService.store('authId', payloadRes.id)
      } else {
        const toast = await this._toastController.create({
          message: "Ce mail n'existe pas ou est déja validé",
          duration: 5000,
          position: 'middle',
          buttons: [
            {
              text: 'Entrez un autre mail',
            },
          ],
        });
        await toast.present();
        toast.onWillDismiss().then(() => this.activateForm.reset());
      }
    })

    // this._service
    //   .doActivate(this.activateForm.value)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: async (response: HttpResponse<any>) => {
    //       if (response.status === 200) {
    //         //this._storage.store('auth',response.body.token)
    //         this._router.navigate(['insertcode'])
    //       } else {
            // const toast = await this._toastController.create({
            //   message: response.body.message,
            //   duration: 5000,
            //   position: 'middle',
            //   buttons: [
            //     {
            //       text: 'Réessayer',
            //     },
            //   ],
            // });
            // await toast.present();
            // toast.onWillDismiss().then(() => this.activateForm.reset());
    //       }
    //     },
    //     error: (error: any) => {
    //     },
    //   });
  }

}
