import { Injectable } from '@nestjs/common';
import { Addable } from './interfaces/addable.interface';
import { Getable } from './interfaces/getable.interface';
import { Updatable } from './interfaces/updatable.interface';
import { Deletable } from './interfaces/deletable.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Boite } from './models/boite-schema';
import { BoiteType } from './models/boite.type';
import { MockResult } from './models/mock';

@Injectable()
export class AppService implements Addable, Getable, Updatable, Deletable {
  constructor(@InjectModel('Boite') private boiteModel: Model<Boite>) {}

  add(any: any) {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Array<BoiteType>> {
    const allBoite = await this.boiteModel.find();
    if (allBoite.length === 0) {
      console.log('je suis arrivé au bout');
      return null;
    }
    return allBoite;
  }
  findOne(id: string | number) {
    throw new Error('Method not implemented.');
  }
  update(id: any, object?: any) {
    throw new Error('Method not implemented.');
  }
  delete(id: any) {
    throw new Error('Method not implemented.');
  }

  fakeResult(): Promise<any[]> {
    return new Promise((resolve) => resolve(MockResult));
  }

  addCompany(payload: any) {
    this.boiteModel
      .findOne({ internId: payload.internId })
      .then((personnalDatas) => {
        if (personnalDatas) {
          if (personnalDatas.companies.includes(payload.companyId)) {
            throw new Error('Company already added');
          } else {
            personnalDatas.companies.push(payload.companyId);
            personnalDatas.save().then((savedDatas) => {
              return savedDatas;
            });
          }
        } else {
          const newIntern = new this.boiteModel({
            internId: payload.internId,
            companies: [payload.companyId],
          });
          newIntern.save().then((savedDatas) => {
            return savedDatas;
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
