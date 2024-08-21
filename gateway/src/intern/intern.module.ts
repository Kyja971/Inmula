import { Module } from '@nestjs/common';
import { InternService } from './intern.service';
import { InternController } from './intern.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [InternService],
  controllers: [InternController],
  imports: [
    ClientsModule.register([
      {
        name: 'INTERN',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3100,
        },
      },
    ]),
  ],
})
export class InternModule {}
