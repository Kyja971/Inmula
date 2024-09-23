import { Component, OnInit } from '@angular/core';
import { SelfInformationService } from '../core/services/self-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(
    private _self: SelfInformationService,
    private _route: Router
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  checkProfile() {
    this._route.navigate(['', 'tabs', 'tab2', 'profile-page', this._self.retrievePersonnal()])
  }
}
