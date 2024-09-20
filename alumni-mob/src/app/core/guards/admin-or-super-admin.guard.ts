import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SelfInformationService } from '../services/self-information.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrSuperAdminGuard implements CanActivate {

  isAllow: boolean = false

  constructor(

    private _router: Router,
    private _self: SelfInformationService,
    private _authService: AuthService,
    private _storage: StorageService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GuardResult> {
    const token = this._storage.retrieve('auth')
    await lastValueFrom(this._authService.getRole({ token: token }).pipe(take(1))).then((role: string) => {
      this.isAllow = (role === 'admin' || role === 'super_admin')
    })

    if (this.isAllow) 
      return true

    this._router.navigate(['/', 'tabs'])
    return false
  }

}