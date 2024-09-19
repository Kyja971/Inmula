import { Test, TestingModule } from '@nestjs/testing';
import { BonneBoiteService } from './bonne-boite.service';

describe('BonneBoiteService', () => {
  let service: BonneBoiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonneBoiteService],
    }).compile();

    service = module.get<BonneBoiteService>(BonneBoiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
