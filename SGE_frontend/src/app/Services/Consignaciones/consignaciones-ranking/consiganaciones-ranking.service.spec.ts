import { TestBed } from '@angular/core/testing';

import { ConsiganacionesRankingService } from './consiganaciones-ranking.service';

describe('ConsiganacionesRankingService', () => {
  let service: ConsiganacionesRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsiganacionesRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
