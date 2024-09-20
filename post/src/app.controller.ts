import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PostEntity } from './entities/post-entity';
import { DeleteResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'add' })
  async add(post: CreatePostDto): Promise<CreatePostDto> {
    return this.appService.add(post);
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(payload: any): Promise<Array<PostEntity | null>> {
    return this.appService.findAll(payload?.take, payload?.page);
  }

  @MessagePattern({ cmd: 'findByType' })
  async findByType(payload: any): Promise<Array<PostEntity | null>> {
    return this.appService.findByType(
      payload?.take,
      payload?.page,
      payload?.type,
    );
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(id: number): Promise<PostEntity> {
    return await this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'update' })
  async update(payload: any): Promise<PostEntity> {
    return this.appService.update(payload?.id, payload?.post);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(id: number): Promise<DeleteResult> {
    return await this.appService.delete(id);
  }
}
