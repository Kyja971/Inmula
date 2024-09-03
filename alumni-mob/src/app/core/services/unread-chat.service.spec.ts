import { TestBed } from '@angular/core/testing';

import { UnreadChatService } from './unread-chat.service';

describe('UnreadChatService', () => {
  let service: UnreadChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnreadChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
