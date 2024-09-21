import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminOrSuperAdminGuard } from './guards/admin-super-admin.guard';
import { AdminGuard } from './guards/admin.guard';
import { FirstConnexionGuard } from './guards/first-connexion.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminOrSuperAdminGuard,
    AdminGuard,
    FirstConnexionGuard,
  ],
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3200,
        },
      },
    ]),
  ],
  exports: [AdminOrSuperAdminGuard, AdminGuard, AuthService],
})
export class AuthModule {}
