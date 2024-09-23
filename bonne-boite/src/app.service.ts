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
            Logger.log(personnal, 'intérieur condition');
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
                return updatedDatas;
              })
              .catch((error) => {
                return error;
              });
          }
          return new Error('Company allready followed');
        }
        const newPersonnal = new this.boiteModel({
          internId: payload.id,
          companies: [payload.companyId],
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

    // an other way to add a company
    // return this.boiteModel
    //   .findOneAndUpdate(
    //     {
    //       internId: payload.id,
    //       'companies.companyId': { $nin: [payload.companyId] }, //nin = not in dans le document
    //     },
    //     { $push: { companies: { companyId: payload.companyId.id } } }, //{id: "ssdaf"}
    //     //upsert = combinaison de update et insert, si document trouvé -> update sinon en crée un nouveau avec les infos du payload
    //     { upsert: true },
    //   )
    //   .then((updatedPersonnalDatas) => {
    //     if (updatedPersonnalDatas) {
    //       console.log('Société ajoutée avec succès:', updatedPersonnalDatas);
    //       return updatedPersonnalDatas.save();
    //     } else {
    //       throw new Error('La société est déjà présente dans la liste');
    //     }
    //   })
    //   .catch((error) => {
    //     throw new Error(error);
    //   });
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

  addContact(contact: ContactType, internId: string, companyId: number) {
    const newContact = new this.contactModel({
      internId: internId,
      companyId: companyId,
      contact: contact,
    });
    newContact
      .save()
      .then((savedDatas) => {
        return savedDatas;
      })
      .catch((error) => {
        return error;
      });
  }

  getContact(internId: string, companyId: number) {
    console.log(internId, companyId)
    this.contactModel
      .findOne({
        internId: internId,
        companyId: companyId,
      })
      .then((response) => {
        console.log(response, 'la response')
        if (response) {
          return response;
        } else {
          return undefined;
        }
      });
  }
}
