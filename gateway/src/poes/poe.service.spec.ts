import { Test, TestingModule } from '@nestjs/testing';
import { PoeService } from './poe.service';

describe('PoeService', () => {
  let service: PoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoeService],
    }).compile();

    service = module.get<PoeService>(PoeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
