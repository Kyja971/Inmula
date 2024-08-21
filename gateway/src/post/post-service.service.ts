import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './models/post-entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private _repository: Repository<PostEntity>,
  ) {}

  findAll(): Promise<Array<PostEntity>> {
    return this._repository.find();
  }
}
