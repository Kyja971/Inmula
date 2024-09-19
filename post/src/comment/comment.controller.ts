import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCommentDto } from 'src/dto/create-comment-dto';

@Controller('comment')
export class CommentController {
  constructor(private _commentService: CommentService) {}

  /**
   *
   * @param body A payload containing the postId { postId: number }
   * @returns An array of comments related to this post
   */
  @MessagePattern({ cmd: 'getComments' })
  async getComments(body: any): Promise<CreateCommentDto[]> {
    return await this._commentService.getComments(body);
  }

  @MessagePattern({ cmd: 'newComment' })
  async newComment(body: any): Promise<CreateCommentDto> {
    return await this._commentService.newComment(body);
  }
}
