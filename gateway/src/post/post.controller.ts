import { Controller, Get } from '@nestjs/common';
import { PostService } from './post-service.service';
import { PostEntity } from './models/post-entity';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  @Get() //GET htpp://localhost:3000/post
  async findAll(): Promise<Array<PostEntity>> {
    return await this._service.findAll();
  }
}
