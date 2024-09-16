import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class isConnectedGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      //await, attend le résultat du promise avec lastValueForm
      const payload = await lastValueFrom(
        this._authService.decodeToken({ token: token }),
      );
      if (
        payload.role !== 'super_admin' &&
        payload.role !== 'admin' &&
        payload.role !== 'stagiaire'
      )
        return false;
      request['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
