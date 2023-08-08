import { TestBed } from '@angular/core/testing';

import { BuscarClientesService } from './buscar-clientes.service';

describe('BuscarClientesService', () => {
  let service: BuscarClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
