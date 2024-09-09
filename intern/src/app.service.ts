import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InternInterface } from './interfaces/intern.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInternDto } from './dto/create-intern.dto';
import { UpdateInternDto } from './dto/update-intern.dto';
import { Addable } from './interfaces/addable.interface';
import { Getable } from './interfaces/getable.interface';
import { Updatable } from './interfaces/updatable.interface';
import { Deletable } from './interfaces/deletable.interface';

@Injectable()
export class AppService implements Addable, Getable, Updatable, Deletable {
  constructor(
    @InjectModel('Intern') private internModel: Model<InternInterface>,
  ) {}

  async findAll(): Promise<InternInterface[]> {
    const allInterns = await this.internModel.find();
    if (allInterns.length === 0) {
      return new Promise(null);
    }
    return allInterns;
  }

  async findOne(id: string): Promise<InternInterface | null> {
    const intern = await this.internModel.findOne({ _id: id });
    if (!intern) {
      return new Promise(null);
    }
    return intern;
  }

  async findOneByMail(email: string): Promise<string | null> {
    const intern = await this.internModel.findOne({ emails: { $in: [email] } });
    if (!intern) {
      return new Promise(null);
    }
    return intern.id;
  }

  async add(createInternDto: CreateInternDto): Promise<InternInterface> {
    const newIntern = new this.internModel(createInternDto);
    const savedIntern = await newIntern.save();
    return savedIntern;
  }

  async update(
    id: string,
    updateInternDto: UpdateInternDto,
  ): Promise<InternInterface | null> {
    const internToUpdate = await this.internModel.findByIdAndUpdate(
      id,
      updateInternDto,
    );
    Logger.log(internToUpdate, 'app.service');
    if (!internToUpdate) {
      return new Promise(null);
    } else {
      return this.internModel.findById(id);
    }
  }

  async delete(id: string): Promise<InternInterface | null> {
    const internToDelete = await this.internModel.findById(id);
    if (!internToDelete) {
      return new Promise(null);
    } else {
      await this.internModel.deleteOne({ _id: id });
      return internToDelete;
    }
  }
}
