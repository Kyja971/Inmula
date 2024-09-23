import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { BoiteType } from './models/boite.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'findAll' })
  findAll(): Promise<Array<BoiteType>> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'fakeResult' })
  fakeResult(): Promise<Array<any>> {
    return this.appService.fakeResult();
  }

  @MessagePattern({ cmd: 'addCompany' })
  addCompany(payload: any) {
    return this.appService.addCompany(payload);
  }

  @MessagePattern({ cmd: 'myArray' })
  getPersonnalArray(id: string) {
    return this.appService.getPersonnalArray(id);
  }

  @MessagePattern({ cmd: 'InfosCies' })
  getCompanyIdToCompanyInfo(ciesFollowid: number[]) {
    return this.appService.getCompanyIdToCompanyInfo(ciesFollowid);
  }
}
