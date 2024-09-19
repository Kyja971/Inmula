import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PostType } from './models/post.type';
import { CreatePostDto } from './dto/create-post-dto';
import { LikeStatusDto } from './dto/like-status-dto';
import { DeleteResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment-dto';

@Injectable()
export class PostService {
  constructor(@Inject('POST') private _client: ClientProxy) {}

  findAll(take: number, page: number): Observable<PostType[]> {
    const pattern: any = { cmd: 'findAll' };
    const payload: any = { take: take, page: page };
    return this._client.send<PostType[], any>(pattern, payload);
  }

  findOne(id: number): Observable<CreatePostDto | null> {
    const pattern: any = { cmd: 'findOne' };
    return this._client.send<CreatePostDto | null, any>(pattern, id);
  }

  add(post: CreatePostDto): Observable<CreatePostDto> {
    const pattern: any = { cmd: 'add' };
    return this._client.send<CreatePostDto>(pattern, post);
  }

  update(id: number, post: CreatePostDto): Observable<CreatePostDto | null> {
    const pattern: any = { cmd: 'update' };
    const payload: any = { id: id, post: post };
    return this._client.send<CreatePostDto, any>(pattern, payload);
  }

  delete(id: number): Observable<CreatePostDto | null> {
    const pattern: any = { cmd: 'delete' };
    return this._client.send<CreatePostDto | null, any>(pattern, id);
  }

  getLikes(body: any): Observable<string[]> {
    const pattern: any = { cmd: 'getLikes' };
    return this._client.send<string[] | null, any>(pattern, body);
  }

  getLike(body: any): Observable<LikeStatusDto> {
    const pattern: any = { cmd: 'getLike' };
    return this._client.send<LikeStatusDto | null, any>(pattern, body);
  }

  addLike(body: any): Observable<LikeStatusDto> {
    const pattern: any = { cmd: 'addLike' };
    return this._client.send<LikeStatusDto, any>(pattern, body);
  }

  deleteLike(likeId: number): Observable<DeleteResult> {
    const pattern: any = { cmd: 'deleteLike' };
    return this._client.send<DeleteResult, any>(pattern, likeId);
  }

  getComments(body: any): Observable<CreateCommentDto[]> {
    const pattern: any = { cmd: 'getComments' };
    return this._client.send<CreateCommentDto[] | null, any>(pattern, body);
  }

  addComment(body: any): Observable<CreateCommentDto> {
    const pattern: any = { cmd: 'newComment' };
    return this._client.send<CreateCommentDto | null, any>(pattern, body);
  }
}
