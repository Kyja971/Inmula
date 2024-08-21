import { Inject, Injectable } from '@nestjs/common';
import { InternType } from './models/intern.type';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class InternService {
  constructor(@Inject('INTERN') private _client: ClientProxy) {}

  findAll(): Observable<Array<InternType>> {
    const pattern: any = { cmd: 'findAll' };
    return this._client.send<InternType[], any>(pattern, {});
  }

  findOne(id: string): Observable<InternType> {
    const pattern: any = { cmd: 'findOne' };
    const payload: any = { id: id };
    return this._client.send<InternType, any>(pattern, payload);
  }

  add(intern: InternType): Observable<InternType> {
    const pattern: any = { cmd: 'create' };
    const payload: any = { intern: intern };
    return this._client.send<InternType, any>(pattern, payload);
  }

  update(id: string, intern: InternType): Observable<InternType> {
    const pattern: any = { cmd: 'update' };
    const payload: any = { id: id, intern: intern };
    return this._client.send<InternType, any>(pattern, payload);
  }

  delete(id: string): Observable<InternType | null> {
    const pattern: any = { cmd: 'delete' };
    const payload: any = { id: id };
    return this._client.send<null, any>(pattern, payload);
  }
}
