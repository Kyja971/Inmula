import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    ClientsModule.register([
      {
        name: 'POST',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3101,
        },
      },
    ]),
  ],
})
export class PostModule {}
