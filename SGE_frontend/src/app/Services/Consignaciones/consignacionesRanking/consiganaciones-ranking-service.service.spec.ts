import { TestBed } from '@angular/core/testing';

import { ConsiganacionesRankingServiceService } from './consiganaciones-ranking-service.service';

describe('ConsiganacionesRankingServiceService', () => {
  let service: ConsiganacionesRankingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsiganacionesRankingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
