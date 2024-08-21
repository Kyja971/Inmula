import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InternInterface } from './interfaces/intern.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Crud } from './interfaces/crud.interface';

@Injectable()
export class AppService implements Crud {
  constructor(
    @InjectModel('Intern') private internModel: Model<InternInterface>,
  ) {}

  async findAll(): Promise<InternInterface[]> {
    const allInterns = await this.internModel.find();
    if (!allInterns) {
      throw new NotFoundException(`Interns data not found`);
    }
    return allInterns;
  }

  async findOne(id: string): Promise<InternInterface> {
    console.log(id);
    console.log(typeof id);
    const intern = await this.internModel.findById(id);
    if (!intern) {
      throw new NotFoundException(`Intern with id: ${id} not found`);
    }
    return intern;
  }

  async add(intern: InternInterface): Promise<InternInterface> {
    const newIntern = new this.internModel(intern);
    return await newIntern.save();
  }

  async update(id: string, intern: InternInterface): Promise<InternInterface> {
    const internToUpdate = await this.internModel.findByIdAndUpdate(id, intern);
    if (!internToUpdate) {
      throw new NotFoundException(`Intern #${id} not found`);
    } else {
      return this.internModel.findById(id);
    }
  }

  async delete(id: string): Promise<InternInterface | null> {
    const internToDelete = await this.internModel.findById(id);
    if (!internToDelete) {
      return null;
    } else {
      await this.internModel.deleteOne({ _id: id });
      return internToDelete;
    }
  }
}
