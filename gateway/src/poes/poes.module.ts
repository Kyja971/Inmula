import { Module } from '@nestjs/common';
import { PoeService } from './poe.service';
import { PoeController } from './poes.controller';

@Module({
  imports: [],
  controllers: [PoeController],
  providers: [PoeService],
})
export class PoeModule {}
