import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '../core/types/auth/auth.type';
import { AuthService } from '../core/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-auth',
  templateUrl: './tab-auth.page.html',
  styleUrls: ['./tab-auth.page.scss'],
})
export class TabAuthPage implements OnInit{

  public auths: Array<AuthType> = []

  constructor(
    private _authService: AuthService,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    this._authService.findAll()
    this._authService.auths$.subscribe((auths: AuthType[]) => {
      this.auths = auths;
    })
  }

  async onAddAuth() {
    const authModal = await this._modalController.create({
      component : AddAccountComponent
    });
    authModal.present();
  }

  onDeleteAuth(id?: number) {
    if(id){
      this._authService.delete(id);
    }
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
}
