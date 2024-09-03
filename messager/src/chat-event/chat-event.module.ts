import { Module } from '@nestjs/common';
import { ChatEventGateway } from './chat-event.gateway';
import { NotificationService } from 'src/services/notification.service';

@Module({
  providers: [ChatEventGateway, NotificationService],
})
export class ChatEventModule {}
