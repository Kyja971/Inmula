/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePoeDto } from './dto/create-poe.dto';
//import { UpdatePoeDto } from './dto/update-poe.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Poe } from './entities/poe.entity';

@Injectable()
export class PoeService {
  constructor(@InjectRepository(Poe) private _repository: Repository<Poe>) {}

  create(createPoeDto: CreatePoeDto) {
    return 'This action adds a new poe';
  }

  findAll(): Promise<Array<Poe>> {
    return this._repository.find({
      order: {
        beginAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} poe`;
  }

  // update(id: number, updatePoeDto: UpdatePoeDto) {
  //   return `This action updates a #${id} poe`;
  // }

  remove(id: number) {
    return `This action removes a #${id} poe`;
  }
}
