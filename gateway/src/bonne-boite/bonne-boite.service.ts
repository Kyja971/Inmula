import { Inject, Injectable } from '@nestjs/common';
import { BonneBoiteDto } from './dto/create-bonne-boite.dto';
import { UpdateBonneBoiteDto } from './dto/update-bonne-boite.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BoiteType } from './models/boite-type';

@Injectable()
export class BonneBoiteService {
  constructor(@Inject('BOITE') private _client: ClientProxy) {}

  create(createBonneBoiteDto: BonneBoiteDto) {
    return 'This action adds a new bonneBoite';
  }

  findAll(): Observable<Array<BoiteType>> {
    const pattern: any = { cmd: 'findAll' };
    return this._client.send<BoiteType[], any>(pattern, {});
  }

  findOne(id: number) {
    return `This action returns a #${id} bonneBoite`;
  }

  update(id: number, updateBonneBoiteDto: UpdateBonneBoiteDto) {
    return `This action updates a #${id} bonneBoite`;
  }

  remove(id: number) {
    return `This action removes a #${id} bonneBoite`;
  }

  fakeResult(): Observable<Array<any>> {
    const pattern: any = { cmd: 'fakeResult' };
    return this._client.send<any[], any>(pattern, {});
  }
}
