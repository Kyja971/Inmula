import { Component, OnInit } from '@angular/core';
import { SelfInformationService } from '../core/services/self-information.service';
import { StorageService } from '../core/services/storage.service';
import { AuthService } from '../core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  isAllow: boolean = false

  //TODO: use subject instead of public reference
  constructor(
    private _storage : StorageService,
    private _authService : AuthService
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {
    const token = this._storage.retrieve('auth')
    await this._authService.getRole({ token: token }).pipe(take(1)).subscribe((role: string) => {
      this.isAllow = (role === 'admin' || role === 'super_admin')
    })
  }
}
