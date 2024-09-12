import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Any } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });


  
    describe('findOne', () => {
      it('should return an object of posts', async () => {
        const result = {};
        jest.spyOn(appService, 'findOne').mockImplementation(() => result);
  
        expect(await appController.findOne()).toBe(result);
      });
    });
  });
});
