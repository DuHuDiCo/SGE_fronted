import { TestBed } from '@angular/core/testing';

import { ObtenerCedulaService } from './obtener-cedula.service';

describe('ObtenerCedulaService', () => {
  let service: ObtenerCedulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerCedulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
