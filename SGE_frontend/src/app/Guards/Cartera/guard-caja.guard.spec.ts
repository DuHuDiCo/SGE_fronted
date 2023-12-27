import { TestBed } from '@angular/core/testing';

import { GuardCajaGuard } from './guard-caja.guard';

describe('GuardCajaGuard', () => {
  let guard: GuardCajaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardCajaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
