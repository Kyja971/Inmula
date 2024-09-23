import { Inject, Injectable } from '@nestjs/common';
import { BonneBoiteDto } from './dto/create-bonne-boite.dto';
import { UpdateBonneBoiteDto } from './dto/update-bonne-boite.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BoiteType } from './models/boite-type';
import { ContactType } from './models/contact.type';

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

  addCompany(id: string, companyId: number) {
    const pattern: any = { cmd: 'addCompany' };
    const payload: any = { id: id, companyId: companyId };
    return this._client.send<any[], any>(pattern, payload);
  }

  getPersonnalArray(id: string): Observable<Array<number>> {
    const pattern: any = { cmd: 'myArray' };
    return this._client.send<number[], any>(pattern, id);
  }

  getCompanyIdToCompanyInfo(params: number[]) {
    const pattern: any = { cmd: 'InfosCies' };
    return this._client.send<number[], any>(pattern, params);
  }

  addContact(internId: string, companyId: number, contact: ContactType) {
    const pattern: any = { cmd: 'addContact' };
    const payload: any = {
      internId: internId,
      companyId: companyId,
      contact: contact,
    };
    return this._client.send<ContactType, any>(pattern, payload);
  }

  getContact(internId: string, companyId: number) {
    const pattern: any = { cmd: 'getContact' };
    const payload: any = {
      internId: internId,
      companyId: companyId,
    };
    return this._client.send<ContactType | undefined, any>(pattern, payload);
  }
}
