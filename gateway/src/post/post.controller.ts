import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PostType } from './models/post.type';
import { Observable, switchMap, take } from 'rxjs';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { isConnectedGuard } from './guards/is-connected.guard';
import { Request } from 'express';
import { LikeStatusDto } from './dto/like-status-dto';
import { DeleteResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  @UseGuards(isConnectedGuard)
  @Get() //GET htpp://localhost:3000/post
  findAll(
    @Query('take') takePost: number,
    @Query('page') page: number,
  ): Observable<PostType[]> {
    return this._service.findAll(takePost, page).pipe(take(1));
  }

  @Get('/type/search')
  findByType(
    @Query('take') takePost: number,
    @Query('page') page: number,
    @Query('type') type: string,
  ): Observable<PostType[]> {
    return this._service.findByType(takePost, page, type).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<CreatePostDto> {
    return this._service.findOne(id).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Post()
  add(@Body() body: CreatePostDto): Observable<CreatePostDto> {
    return this._service.add(body).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() body: CreatePostDto,
  ) {
    if (
      req['user'].internId === body.authorId ||
      req['user'].role === 'super_admin'
    ) {
      return this._service.update(id, body).pipe(take(1));
    } else {
      throw new UnauthorizedException("Vous n'avez pas les droits");
    }
  }

  @Delete('unlike/:id')
  async deleteLike(
    @Param('id') likeId: number,
  ): Promise<Observable<DeleteResult>> {
    return this._service.deleteLike(likeId).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  async delete(@Req() req: Request, @Param('id') id: number): Promise<Observable<CreatePostDto>> {
    if (req['user'].role === 'super_admin') {
      return this._service.delete(id).pipe(take(1));
    } else {
      return this.findOne(id).pipe(
        take(1),
        switchMap((post: CreatePostDto) => {
          if (req['user'].internId === post.authorId) {
            return this._service.delete(id).pipe(take(1));
          } else {
            throw new UnauthorizedException("Vous n'avez pas les droits");
          }
        }),
      );
    }
  }

  /**
   * @param body A payload containing the postId { postId: number }
   * @returns an observable of string[] containing all the interns id
   */
  @Post('likes')
  async getLikes(@Body() body: any): Promise<Observable<string[]>> {
    return this._service.getLikes(body).pipe(take(1));
  }

  @Post('like')
  async getLike(@Body() body: any): Promise<Observable<LikeStatusDto>> {
    return this._service.getLike(body).pipe(take(1));
  }

  @Post('addLike')
  async addLike(@Body() body: any): Promise<Observable<LikeStatusDto>> {
    return this._service.addLike(body).pipe(take(1));
  }

  @Post('comments')
  async getComments(
    @Body() body: any,
  ): Promise<Observable<CreateCommentDto[]>> {
    return this._service.getComments(body).pipe(take(1));
  }

  /**
   * @param body body : { internId: string, postId: number, content: string }
   */
  @Post('newComment')
  async newComment(@Body() body: any): Promise<Observable<CreateCommentDto>> {
    return this._service.addComment(body).pipe(take(1));
  }
}
