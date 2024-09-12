import { Component } from '@angular/core';
import { SelfInformationService } from '../core/services/self-information.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private _selfInformation : SelfInformationService) {}

  get isAdminOrSuperAdmin() {
    const user = this._selfInformation.role; // Fonction pour récupérer le rôle de l'utilisateur
    return user === 'admin' || user === 'super_admin';
  }

}
