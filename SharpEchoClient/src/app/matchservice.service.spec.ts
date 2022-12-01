import { TestBed } from '@angular/core/testing';

import { MatchserviceService } from './matchservice.service';

describe('MatchserviceService', () => {
  let service: MatchserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
