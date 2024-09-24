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
  async getPersonnalArray(id: string) {
    return await this.appService.getPersonnalArray(id);
  }

  @MessagePattern({ cmd: 'InfosCies' })
  getCompanyIdToCompanyInfo(ciesFollowid: number[]) {
    return this.appService.getCompanyIdToCompanyInfo(ciesFollowid);
  }

  @MessagePattern({ cmd: 'updateContact' })
  updateContact(payload: any) {
    return this.appService.updateContact(
      payload.contact,
      payload.internId,
      payload.companyId,
    );
  }

  @MessagePattern({ cmd: 'getContact' })
  getContact(payload: any) {
    return this.appService.getContact(payload.internId, payload.companyId);
  }
}
