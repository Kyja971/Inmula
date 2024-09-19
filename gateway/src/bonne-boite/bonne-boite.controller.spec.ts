import { Test, TestingModule } from '@nestjs/testing';
import { BonneBoiteController } from './bonne-boite.controller';
import { BonneBoiteService } from './bonne-boite.service';

describe('BonneBoiteController', () => {
  let controller: BonneBoiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonneBoiteController],
      providers: [BonneBoiteService],
    }).compile();

    controller = module.get<BonneBoiteController>(BonneBoiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
