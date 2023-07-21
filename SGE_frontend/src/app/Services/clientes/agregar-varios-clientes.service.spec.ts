import { TestBed } from '@angular/core/testing';

import { AgregarVariosClientesService } from './agregar-varios-clientes.service';

describe('AgregarVariosClientesService', () => {
  let service: AgregarVariosClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarVariosClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
