import { TestBed } from '@angular/core/testing';

import { CuentasCobrarService } from './cuentas-cobrar.service';

describe('CuentasCobrarService', () => {
  let service: CuentasCobrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasCobrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
