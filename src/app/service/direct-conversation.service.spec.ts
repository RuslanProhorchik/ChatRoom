import { TestBed } from '@angular/core/testing';

import { DirectConversationService } from './direct-conversation.service';

describe('DirectConversationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectConversationService = TestBed.get(DirectConversationService);
    expect(service).toBeTruthy();
  });
});
