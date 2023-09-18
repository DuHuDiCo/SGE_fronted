import { TestBed } from '@angular/core/testing';

import { EstadoServiceService } from './estado-service.service';

describe('EstadoServiceService', () => {
  let service: EstadoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
