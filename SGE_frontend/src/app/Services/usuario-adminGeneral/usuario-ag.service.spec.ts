import { TestBed } from '@angular/core/testing';

import { UsuarioAgService } from './usuario-ag.service';

describe('UsuarioAgService', () => {
  let service: UsuarioAgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
