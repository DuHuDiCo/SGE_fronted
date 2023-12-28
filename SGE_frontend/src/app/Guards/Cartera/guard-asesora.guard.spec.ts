import { TestBed } from '@angular/core/testing';

import { GuardAsesoraGuard } from './guard-asesora.guard';

describe('GuardAsesoraGuard', () => {
  let guard: GuardAsesoraGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardAsesoraGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
