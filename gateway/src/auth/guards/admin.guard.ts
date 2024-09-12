/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

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
      request['user'] = payload;
      if (payload.role == 'admin')
        return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
