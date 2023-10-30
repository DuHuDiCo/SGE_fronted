import { TestBed } from '@angular/core/testing';

import { IngresarService } from './ingresar.service';

describe('IngresarService', () => {
  let service: IngresarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
