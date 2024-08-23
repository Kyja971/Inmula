import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post-entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostType } from './types/post.type';
import { ClientProxy } from '@nestjs/microservices';
import { InternType } from './types/intern.type';
import { Subscription, lastValueFrom } from 'rxjs';
import { FormatPagingService } from './services/format-paging.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PostEntity) private _repository: Repository<PostEntity>,
    @Inject('INTERN') private _client: ClientProxy,
    private _formatPaging: FormatPagingService,
  ) {}

  private _subscription: Subscription;

  async findAll(take: number, page: number): Promise<PostEntity[] | null> {
    this._formatPaging.formatPaging(take, page);
    return this._repository
      .find({
        take: take,
        skip: this._formatPaging.skip,
        order: {
          postedAt: 'DESC',
        },
      })
      .then(async (posts) => {
        if (posts.length === 0) {
          if (page > 1) {
            this.findAll(take, page - 1);
          }
          return null;
        } else {
          const pattern = { cmd: 'findOne' };
          const answer = [];
          for (const post of posts) {
            await lastValueFrom(
              this._client.send<InternType | null>(pattern, {
                id: post.authorId,
              }),
            )
              .then((intern) => {
                if (intern) {
                  post.author = intern;
                } else {
                  post.author = undefined;
                }
                answer.push(post);
              })
              .catch((error) => {
                post.author = error;
                answer.push(post);
              });
          }
          return answer;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this._repository.findOneBy({ id: id });
  }

  async add(post: PostType): Promise<PostEntity> {
    return this._repository.save(post);
  }

  update(id: number, post: PostType): Promise<UpdateResult> {
    return this._repository.update({ id: id }, post);
  }

  delete(id: number): Promise<DeleteResult> {
    return this._repository.delete({ id: id });
  }
}
