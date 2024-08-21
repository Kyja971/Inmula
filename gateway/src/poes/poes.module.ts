import { Module } from '@nestjs/common';
import { PoeService } from './poe.service';
import { PoeController } from './poes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poe } from './entities/poe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poe])],
  controllers: [PoeController],
  providers: [PoeService],
})
export class PoeModule {}
