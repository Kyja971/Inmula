import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SelfInformationService } from '../services/self-information.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrSuperAdminGuard implements CanActivate {

  constructor(

    private _router: Router,
    private _self: SelfInformationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this._self.isAdminOrSuperAdmin()) 
      return true

    this._router.navigate(['/', state.url])
    return false
  }

}