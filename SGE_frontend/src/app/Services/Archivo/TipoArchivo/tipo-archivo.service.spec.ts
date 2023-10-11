import { TestBed } from '@angular/core/testing';

import { TipoArchivoService } from './tipo-archivo.service';

describe('TipoArchivoService', () => {
  let service: TipoArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
