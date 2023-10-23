import { TestBed } from '@angular/core/testing';

import { ObligacionesService } from './obligaciones.service';

describe('ObligacionesService', () => {
  let service: ObligacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
