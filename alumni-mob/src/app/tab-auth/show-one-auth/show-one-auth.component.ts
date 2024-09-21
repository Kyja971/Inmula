import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthType } from 'src/app/core/types/auth/auth.type';
import { AddAccountComponent } from '../components/add-account/add-account.component';

@Component({
  selector: 'app-show-one-auth',
  templateUrl: './show-one-auth.component.html',
  styleUrls: ['./show-one-auth.component.scss'],
})
export class ShowOneAuthComponent  implements OnInit {

  @Input()
  auth!: AuthType

  public isAllow: boolean = false

  constructor(
    private _storage: StorageService,
    private _authService: AuthService,
    private _alertController: AlertController,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    const token = this._storage.retrieve('auth')
    this._authService.getRole({ token: token }).pipe(take(1)).subscribe((role: string) => {
      this.isAllow = (role === 'super_admin') || (role === 'admin' && this.auth.role === 'stagiaire');
    })
  }

  async onUpdateAuth(auth: AuthType) {
    const authModal = await this._modalController.create({
      component : AddAccountComponent,
      componentProps: {
        auth : auth
      }
    });
    authModal.present();
  }

  onDeleteAuth(id?: number) {
    if(id){
      this._authService.delete(id);
    }
  }

  async presentAlert(auth: AuthType) {
    const alert = await this._alertController.create({
      header: 'Suppression',
      message: `Êtes vous sur de vouloir supprimer ${auth.email} ?`,
      buttons: [{
        text: "Oui",
        role: "confirm",
        handler: () => {
          this.onDeleteAuth(auth.id)
        }
      }
        ,{
          text: "Non",
          role: "cancel"
        }],
    });

    await alert.present();
  }

}
