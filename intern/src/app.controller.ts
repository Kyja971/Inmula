import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { InternType } from './Types/intern/intern.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'hello' })
  findAll(): Array<InternType> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'findone' })
  findOne(id: number) {
    return this.appService.findOne(id);
  }
}
