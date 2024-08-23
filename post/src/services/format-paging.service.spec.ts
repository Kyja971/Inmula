import { Test, TestingModule } from '@nestjs/testing';
import { FormatPagingService } from './format-paging.service';

describe('SkipFormatService', () => {
  let service: FormatPagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormatPagingService],
    }).compile();

    service = module.get<FormatPagingService>(FormatPagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
