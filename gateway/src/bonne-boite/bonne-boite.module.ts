import { Module } from '@nestjs/common';
import { BonneBoiteService } from './bonne-boite.service';
import { BonneBoiteController } from './bonne-boite.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [BonneBoiteController],
  providers: [BonneBoiteService],
  imports: [
    ClientsModule.register([
      {
        name: 'BOITE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3105,
        },
      },
    ]),
  ],
})
export class BonneBoiteModule {}
