import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post-entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PostEntity) private _repository: Repository<PostEntity>,
  ) {}

  findAll(): string {
    return;
  }
}
