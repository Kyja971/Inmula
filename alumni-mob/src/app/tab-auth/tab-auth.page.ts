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
export class TabAuthPage implements OnInit, OnDestroy {

  public auths: Array<AuthType> = []
  private sub!: Subscription

  constructor(
    private _authService: AuthService,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    this.sub = this._authService.findAll().subscribe((auths : Array<AuthType>) => {
      this.auths = auths
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  async onAddAuth() {
    const authModal = await this._modalController.create({
      component : AddAccountComponent
    });
    authModal.present();
  }
    

}
