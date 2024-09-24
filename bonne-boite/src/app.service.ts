import { Injectable, Logger } from '@nestjs/common';
import { Addable } from './interfaces/addable.interface';
import { Getable } from './interfaces/getable.interface';
import { Updatable } from './interfaces/updatable.interface';
import { Deletable } from './interfaces/deletable.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Boite } from './models/boite-schema';
import { BoiteType } from './models/boite.type';
import { MockResult } from './models/mock';
import { CompanyItemsType } from './models/company-items.type';
import { ContactCompany } from './models/contact-schema';
import { ContactType } from './models/contact.type';

@Injectable()
export class AppService implements Addable, Getable, Updatable, Deletable {
  constructor(
    @InjectModel('Boite') private boiteModel: Model<Boite>,
    @InjectModel('Contact') private contactModel: Model<ContactCompany>,
  ) {}

  add(any: any) {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Array<BoiteType>> {
    const allBoite = await this.boiteModel.find();
    if (allBoite.length === 0) {
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
    return this.boiteModel
      .findOne({ internId: payload.id })
      .then((personnal) => {
        if (personnal) {
          if (!personnal.companies.includes(payload.companyId.id)) {
            personnal.companies.push(payload.companyId.id);
            this.boiteModel
              .updateOne(
                {
                  internId: payload.id,
                },
                {
                  internId: payload.id,
                  companies: personnal.companies,
                },
              )
              .then((updatedDatas) => {
                const emptyContact = new this.contactModel({
                  internId: payload.id,
                  companyId: payload.companyId.id,
                  contact: new ContactCompany(),
                });
                emptyContact
                  .save()
                  .then(() => {
                    return updatedDatas;
                  })
                  .catch((error) => {
                    return error;
                  });
              })
              .catch((error) => {
                return error;
              });
          }
          throw new Error('Company already followed');
        }
        const newPersonnal = new this.boiteModel({
          internId: payload.id,
          companies: [payload.companyId.id],
        });
        newPersonnal
          .save()
          .then((savedDatas) => {
            return savedDatas;
          })
          .catch((error) => {
            return error;
          });
      });
  }

  getPersonnalArray(id: string): Promise<Array<number>> {
    return this.boiteModel
      .findOne({ internId: id })
      .then((myArray) => {
        if (myArray === null || myArray.companies === null) {
          throw new Error('Pas de compagnies dans vos favoris');
        }
        return myArray.companies;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(
          "Une erreur s'est produite lors de la récupération des compagnies",
        );
      });
  }

  async getCompanyIdToCompanyInfo(
    companyIds: number[],
  ): Promise<CompanyItemsType[]> {
    const results: CompanyItemsType[] = [];

    for (const mock of MockResult) {
      for (const item of mock.items) {
        if (companyIds.includes(item.id)) {
          results.push(item);
          break;
        }
      }
    }

    return results;
  }

  updateContact(
    contact: Partial<ContactType>,
    internId: string,
    companyId: number,
  ) {
    return this.contactModel
      .findOneAndUpdate(
        { internId: internId, companyId: companyId },
        { internId: internId, companyId: companyId, contact: contact }
      )
      .then((updatedDatas) => {
        return updatedDatas.contact;
      })
      .catch((error) => {
        return error;
      });
  }

  getContact(internId: string, companyId: number) {
    return this.contactModel
      .findOne({
        internId: internId,
        companyId: companyId,
      })
      .then((response) => {
        if (response) {
          return response.contact;
        } else {
          return undefined;
        }
      });
  }
}
