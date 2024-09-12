import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternInterface } from './interfaces/intern.interface';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('findAll', () => {
    it('should return an array of intern', async () => {
      const result: InternInterface[] = [
        {
          firstname: 'Jacky',
          lastname: 'hoton',
          gender: 'male',
          emails: ['jacky@mail.fr'],
          phonenumber: '06',
          function: 'Stagiaire',
          society: 'Aelion',
          poe: 'POE',
        },
      ];
      jest.spyOn(appService, 'findAll').mockResolvedValue(result);

      expect(await appController.findAll()).toBe(result);
    });
  });
});
