/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePoeDto } from './dto/create-poe.dto';
//import { UpdatePoeDto } from './dto/update-poe.dto';

@Injectable()
export class PoeService {
  constructor() {}

  create(createPoeDto: CreatePoeDto) {
    return 'This action adds a new poe';
  }

  findAll() {}

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
