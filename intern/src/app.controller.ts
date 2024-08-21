import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { InternInterface } from './interfaces/intern.interface';
import { Crud } from './interfaces/crud.interface';

@Controller()
export class AppController implements Crud {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'findAll' })
  findAll(): Promise<InternInterface[]> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: `findOne` })
  findOne(payload: any): Promise<InternInterface | null> {
    return this.appService.findOne(payload?.id);
  }

  @MessagePattern({ cmd: `create` })
  add(payload: any): Promise<InternInterface> {
    return this.appService.add(payload?.intern);
  }

  @MessagePattern({ cmd: 'update' })
  update(payload: any): Promise<InternInterface | null> {
    return this.appService.update(payload?.id, payload?.intern);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(payload: any): Promise<InternInterface | null> {
    const serviceResponse = this.appService.delete(payload?.id);
    if (!serviceResponse) {
      return null;
    }
    return serviceResponse;
  }
}
