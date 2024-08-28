import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PostEntity } from './entities/post-entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable, of } from 'rxjs';
import { CreatePostDto } from './dto/create-post-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'findAll' })
  async findAll(payload: any): Promise<Observable<Array<PostEntity | null>>> {
    return this.appService
      .findAll(payload?.take, payload?.page)
      .then((response) => {
        return of(response);
      })
      .catch((error) => {
        return of(error);
      });
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(id: number): Promise<PostEntity> {
    return await this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'add' })
  async add(post: CreatePostDto): Promise<Observable<PostEntity>> {
    return this.appService
      .add(post)
      .then((savedPost) => {
        if (!savedPost) {
          return of(null);
        }
        return of(savedPost);
      })
      .catch((error) => {
        return of(error);
      });
  }

  @MessagePattern({ cmd: 'update' })
  async update(payload: any): Promise<UpdateResult> {
    return this.appService.update(payload?.id, payload?.post);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(id: number): Promise<DeleteResult> {
    return this.appService.delete(id);
  }
}
