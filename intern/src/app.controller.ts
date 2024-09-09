/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { InternInterface } from './interfaces/intern.interface';
import { CreateInternDto } from './dto/create-intern.dto';
import { Observable, of } from 'rxjs';
import { Addable } from './interfaces/addable.interface';
import { Getable } from './interfaces/getable.interface';
import { Updatable } from './interfaces/updatable.interface';
import { Deletable } from './interfaces/deletable.interface';
import { UpdateInternDto } from './dto/update-intern.dto';
import { isObjectIdOrHexString } from 'mongoose';
import { plainToInstance } from 'class-transformer';

@Controller()
export class AppController implements Addable, Getable, Updatable, Deletable {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'findAll' })
  async findAll(): Promise<Observable<InternInterface[]>> {
    return this.appService
      .findAll()
      .then((internsArray) => {
        if (internsArray.length === 0) {
          return of(null);
        }
        return of(internsArray);
      })
      .catch((error) => {
        return of(error);
      });
  }

  @MessagePattern({ cmd: `findOne` })
  async findOne(payload: any): Promise<Observable<InternInterface | null>> {
    if (isObjectIdOrHexString(payload?.id)) {
      return this.appService
        .findOne(payload.id)
        .then((intern) => {
          if (!intern) {
            return of(null);
          }
          return of(intern);
        })
        .catch((error) => {
          return of(error);
        });
    }
    return of(null);
  }

  @MessagePattern({ cmd: `findOneByMail` })
  async findOneByMail(payload: any): Promise<Observable<string | null>> {
    return this.appService
      .findOneByMail(payload.email)
      .then((id) => {
        if (!id) {
          return of(null);
        }
        return of(id);
      })
      .catch((error) => {
        return of(error);
      });
  }

  @MessagePattern({ cmd: 'create' })
  async add(
    intern: CreateInternDto,
  ): Promise<Observable<InternInterface | null>> {
    intern = plainToInstance(CreateInternDto, intern);
    return this.appService
      .add(intern)
      .then((savedIntern) => {
        if (!savedIntern) {
          return of(null);
        }
        return of(savedIntern);
      })
      .catch((error) => {
        return of(error);
      });
  }

  @MessagePattern({ cmd: 'update' })
  async update(payload: any): Promise<Observable<InternInterface | null>> {
    const intern = plainToInstance(UpdateInternDto, payload?.intern);
    if (
      intern instanceof UpdateInternDto &&
      isObjectIdOrHexString(payload?.id)
    ) {
      return this.appService
        .update(payload.id, payload.intern)
        .then((updatedIntern) => {
          if (!updatedIntern) {
            return of(null);
          }
          return of(updatedIntern);
        })
        .catch((error) => {
          return of(error);
        });
    }
    return of(null);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(payload: any): Promise<Observable<InternInterface | null>> {
    if (isObjectIdOrHexString(payload?.id)) {
      return this.appService
        .delete(payload.id)
        .then((deletedUser) => {
          if (!deletedUser) {
            return of(null);
          }
          return of(deletedUser);
        })
        .catch((error) => {
          return of(error);
        });
    }
    return of(null);
    // const serviceResponse = this.appService.delete(payload?.id);
    // if (!serviceResponse) {
    //   return null;
    // }
    // return serviceResponse;
  }
}
