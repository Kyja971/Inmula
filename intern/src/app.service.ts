import { Injectable } from '@nestjs/common';
import { InternType } from './Types/intern/intern.type';
import { InternRepository } from './intern-repository';

@Injectable()
export class AppService {
  constructor(private _repository: InternRepository) {}

  findAll(): Array<InternType> {
    return this._repository.findAll();
  }

  findOne(id: number): InternType | null {
    return this._repository.findOne(id);
  }
}
