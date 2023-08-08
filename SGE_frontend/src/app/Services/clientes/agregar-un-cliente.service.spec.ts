import { TestBed } from '@angular/core/testing';

import { AgregarUnClienteService } from './agregar-un-cliente.service';

describe('AgregarUnClienteService', () => {
  let service: AgregarUnClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarUnClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
