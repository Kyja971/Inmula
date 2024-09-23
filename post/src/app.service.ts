/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post-entity';
import { DeleteResult, Repository } from 'typeorm';
import { PostType } from './types/post.type';
import { ClientProxy } from '@nestjs/microservices';
import { InternType } from './types/intern.type';
import { lastValueFrom } from 'rxjs';
import { FormatPagingService } from './services/format-paging.service';
import { CreatePostDto } from './dto/create-post-dto';
import { PostTypeEnum } from './types/post-type-enum';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PostEntity) private _postRepository: Repository<PostEntity>,
    @Inject('INTERN') private _client: ClientProxy,
    private _formatPaging: FormatPagingService,
  ) {}

  async add(post: CreatePostDto): Promise<CreatePostDto> {
    const pattern = { cmd: 'findOne' };
    const author = await lastValueFrom(
      this._client.send<InternType>(pattern, { id: post.authorId }),
    )
    if (author){
      post.author = author
      return this._postRepository.save(post)
    } else {
      return null
    }
  }

  async findAll(take: number, page: number): Promise<PostEntity[]> {
    this._formatPaging.formatPaging(take, page)
    return await this._postRepository.find({
      take: take,
      skip: this._formatPaging.skip,
      order: {
        postedAt: 'DESC',
      }
    }).then(async (posts: PostEntity[]) => {
      const answer = []
      if(posts.length === 0){
        //return this.findAll(take, page-1)
      } else {
        //For each post we send a request to the intern microservie to get the Intern from the internId
        for (const post of posts){
          await this.setInternOnPost(post).then((postWithIntern: PostEntity) => {
            answer.push(postWithIntern)
          })
        }
        return answer
      }
    })
  }

  async findByType(take: number, page: number, type: PostTypeEnum): Promise<PostEntity[]> {
    this._formatPaging.formatPaging(take, page)
    return await this._postRepository.find({
      take: take,
      skip: this._formatPaging.skip,
      order: {
        postedAt: 'DESC',
      },
      where : { type: type }
    }).then(async (posts: PostEntity[]) => {
      const answer = []
      if(posts.length === 0){
        //return this.findByType(take, page-1, type)
      } else {
        //For each post we send a request to the intern microservie to get the Intern from the internId
        for (const post of posts){
          await this.setInternOnPost(post).then((postWithIntern: PostEntity) => {
            answer.push(postWithIntern)
          })
        }
        return answer
      }
    })
  }

  /**
   * Set the intern column on one post
   * @param post 
   * @returns the original post with the associate intern
   */
  async setInternOnPost(post: PostEntity): Promise<PostEntity> {
    const pattern = { cmd: 'findOne' };
    await lastValueFrom(
      this._client.send<InternType>(pattern, { id: post.authorId })
    ).then((intern) => {
      post.author = intern
    })
    return post
  }

  findOne(id: number): Promise<PostEntity | null> {
    return this._postRepository
      .findOne({ where: { id } })
      .then(async (onePost) => {
        if (!onePost) {
          return null;
        }
        //récupération du user dans mongodb
        return this.setInternOnPost(onePost)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du post:', error);
        return null;
      });
  }

  async update(postId: number, post: PostType): Promise<PostEntity> {
    //return this._repository.update({ id: id }, post);

    // check si présent dans la bdd
    const existingPost = await this._postRepository.findOne({
      where: { id: postId },
    });
    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }

    // Mise à jour des propriétés de l'utilisateur existant
    existingPost.title = post.title || existingPost.title;
    existingPost.content = post.content || existingPost.content;
    existingPost.media = post.media || existingPost.media;
    existingPost.type = post.type || existingPost.type;
    existingPost.postedAt = post.postedAt || existingPost.postedAt;


    const updatedPost = await this._postRepository.save(existingPost);
    return updatedPost;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._postRepository.delete({ id: id });
  }
}
