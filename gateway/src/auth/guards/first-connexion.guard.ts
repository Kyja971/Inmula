import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { lastValueFrom, take } from 'rxjs';

@Injectable()
export class FirstConnexionGuard implements CanActivate {
  constructor(private _authService: AuthService) {}
  firstConnexion = false;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.cookies.email;

    await lastValueFrom(
      this._authService.checkEmail({ email: email }).pipe(take(1)),
    ).then((payload: any) => {
      this.firstConnexion = payload.isMailActivated;
    });

    return !this.firstConnexion;
  }
}
