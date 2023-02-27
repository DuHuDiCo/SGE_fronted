import { TestBed } from '@angular/core/testing';

import { RolesSystemService } from './roles-system.service';

describe('RolesSystemService', () => {
  let service: RolesSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
