/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post-entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostType } from './types/post.type';
import { ClientProxy } from '@nestjs/microservices';
import { InternType } from './types/intern.type';
import { lastValueFrom } from 'rxjs';
import { FormatPagingService } from './services/format-paging.service';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PostEntity) private _repository: Repository<PostEntity>,
    @Inject('INTERN') private _client: ClientProxy,
    private _formatPaging: FormatPagingService,
  ) {}


  async add(post: CreatePostDto): Promise<CreatePostDto> {
    return this._repository.save(post);
  }

  async findAll(take: number, page: number): Promise<PostEntity[] | null> {
    this._formatPaging.formatPaging(take, page);
    return this._repository.find({
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

  findOne(id: number): Promise<PostEntity | null> {
    return this._repository
      .findOne({ where: { id } })
      .then(async (onePost) => {
        if (!onePost) {
          return null;
        }
        //récupération du user dans mongodb
        const pattern = { cmd: 'findOne' };
        const author = await lastValueFrom(
          this._client.send<InternType>(pattern, { id: onePost.authorId }),
        );
        onePost.author = author;
        return onePost;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du post:', error);
        return null;
      });
  }

  update(id: number, post: PostType): Promise<UpdateResult> {
    return this._repository.update({ id: id }, post);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._repository.delete({ id: id });
  }
}
