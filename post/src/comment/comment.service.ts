import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto/create-comment-dto';
import { CommentStatusEntity } from 'src/entities/comment-entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentStatusEntity)
    private _commentRepository: Repository<CommentStatusEntity>,
  ) {}

  async getComments(body: any): Promise<CreateCommentDto[]> {
    return await this._commentRepository.find({
      where: { postId: body.postId },
    });
  }

  async newComment(body: any): Promise<CreateCommentDto> {
    return this._commentRepository.save(body);
  }
}
