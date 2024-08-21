import { Inject, Injectable } from '@nestjs/common';
import { InternRepository } from './intern-repository';
import { InternType } from './models/intern.type';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class InternService {
  private _repository: InternRepository;

  constructor(@Inject('INTERN') private _client: ClientProxy) {
    this._repository = new InternRepository();
  }

  findAll(): Observable<Array<InternType>> {
    const pattern: any = { cmd: 'hello' };
    return this._client.send<InternType[]>(pattern, {});
  }

  findOne(id: number) {
    const pattern: any = { cmd: 'findone' };
    return this._client.send<InternType>(pattern, id);
  }
}
