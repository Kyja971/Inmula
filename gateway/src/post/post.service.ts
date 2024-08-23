import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PostType } from './models/post.type';

@Injectable()
export class PostService {
  constructor(@Inject('POST') private _client: ClientProxy) {}

  findAll(take: number, page: number): Observable<PostType[]> {
    const pattern: any = { cmd: 'findAll' };
    const payload: any = { take: take, page: page };
    return this._client.send<PostType[], any>(pattern, payload);
  }

  findOne(id: number): Observable<PostType | null> {
    const pattern: any = { cmd: 'findOne' };
    return this._client.send<PostType | null, any>(pattern, id);
  }

  add(post: PostType): Observable<PostType> {
    const pattern: any = { cmd: 'add' };
    return this._client.send<PostType | null, any>(pattern, post);
  }

  update(id: number, post: PostType): Observable<PostType | null> {
    const pattern: any = { cmd: 'update' };
    const payload: any = { id: id, post: post };
    return this._client.send<PostType, any>(pattern, payload);
  }

  delete(id: number): Observable<PostType | null> {
    const pattern: any = { cmd: 'delete' };
    return this._client.send<PostType | null, any>(pattern, id);
  }
}
