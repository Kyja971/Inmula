import { Controller } from '@nestjs/common';
import { PostService } from './post-service.service';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  // @Get() //GET htpp://localhost:3000/post
  // async findAll(): Promise<Array<PostEntity>> {
  //   return await this._service.findAll();
  // }
}
