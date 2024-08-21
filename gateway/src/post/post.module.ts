import { Module } from '@nestjs/common';
import { PostService } from './post-service.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [],
})
export class PostModule {}
