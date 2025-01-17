import { TestBed } from '@angular/core/testing';

import { HistorialRutasService } from './historial-rutas.service';

describe('HistorialRutasService', () => {
  let service: HistorialRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
