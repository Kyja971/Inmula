import { TestBed } from '@angular/core/testing';

import { InsertCodeService } from './insert-code.service';

describe('InsertCodeService', () => {
  let service: InsertCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
