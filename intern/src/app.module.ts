import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternRepository } from './intern-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, InternRepository],
})
export class AppModule {}
