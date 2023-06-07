import { TestBed } from '@angular/core/testing';

import { PermissionsSystemService } from './permissions-system.service';

describe('PermissionsSystemService', () => {
  let service: PermissionsSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
