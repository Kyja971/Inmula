import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SuperAdminGuard } from './guards/super-admin-guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SuperAdminGuard],
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
  exports: [SuperAdminGuard, AuthService],
})
export class AuthModule {}
