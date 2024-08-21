import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private _storage : StorageService,
    private _router : Router,
    private alertController : AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Etes-vous sûr de vouloir quitter ? ',
      buttons: this.alertButtons,
    });
    await alert.present();
  }


  public alertButtons = [
    {
      text: 'Non',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => {
       this._storage.remove('auth');
       this._router.navigate(['/','login'])
      },
    },
  ];



}
