import { Module } from '@nestjs/common';
import { ChatEventGateway } from './chat-event.gateway';

@Module({
  providers: [ChatEventGateway],
})
export class ChatEventModule {}
