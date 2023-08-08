import { TestBed } from '@angular/core/testing';

import { GuardarUsuariosAdminService } from './guardar-usuarios-admin.service';

describe('GuardarUsuariosAdminService', () => {
  let service: GuardarUsuariosAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarUsuariosAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
