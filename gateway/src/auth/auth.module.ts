import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
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
})
export class AuthModule {}
