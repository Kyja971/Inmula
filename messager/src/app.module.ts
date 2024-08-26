import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatEventModule } from './chat-event/chat-event.module';

@Module({
  imports: [ChatEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
