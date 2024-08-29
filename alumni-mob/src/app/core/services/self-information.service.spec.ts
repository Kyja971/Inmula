import { TestBed } from '@angular/core/testing';

import { SelfInformationService } from './self-information.service';

describe('SelfInformationService', () => {
  let service: SelfInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
