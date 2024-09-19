import { Controller } from '@nestjs/common';
import { LikeService } from './like.service';
import { MessagePattern } from '@nestjs/microservices';
import { LikeStatusDto } from 'src/dto/like-status-dto';
import { DeleteResult } from 'typeorm';

@Controller('like')
export class LikeController {
  constructor(private _likeService: LikeService) {}

  @MessagePattern({ cmd: 'getLikes' })
  async getLikes(body: any): Promise<string[]> {
    return await this._likeService.getLikes(body);
  }

  @MessagePattern({ cmd: 'getLike' })
  async getLike(body: any): Promise<LikeStatusDto> {
    return await this._likeService.getLike(body);
  }

  @MessagePattern({ cmd: 'addLike' })
  async addLike(body: any): Promise<LikeStatusDto> {
    return await this._likeService.addLike(body);
  }

  @MessagePattern({ cmd: 'deleteLike' })
  async deleteLike(likeId: number): Promise<DeleteResult> {
    return await this._likeService.deleteLike(likeId);
  }
}
