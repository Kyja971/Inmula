import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeStatusDto } from 'src/dto/like-status-dto';
import { LikeStatusEntity } from 'src/entities/like-entity';
import { PostEntity } from 'src/entities/post-entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeStatusEntity)
    private _likeStatusRepository: Repository<LikeStatusEntity>,
    @InjectRepository(PostEntity)
    private _postRepository: Repository<PostEntity>,
  ) {}

  async getLikes(body: any): Promise<string[]> {
    const post = await this._postRepository.findOne({
      where: { id: body.postId },
    });
    if (!post) {
      throw new NotFoundException(`Post #${body.postId} not found`);
    }
    return (
      await this._likeStatusRepository.find({ where: { postId: body.postId } })
    ).map((like: LikeStatusEntity) => like.internId);
  }

  async getLike(body: any): Promise<LikeStatusDto> {
    return await this._likeStatusRepository.findOne({
      where: { internId: body.internId, postId: body.postId },
    });
  }

  async addLike(body: any): Promise<LikeStatusDto> {
    return this._likeStatusRepository.save(body);
  }

  async deleteLike(likeId: number): Promise<DeleteResult> {
    return this._likeStatusRepository.delete({ id: likeId });
  }
}
