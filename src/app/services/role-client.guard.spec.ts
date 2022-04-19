import { TestBed } from '@angular/core/testing';

import { RoleClientGuard } from './role-client.guard';

describe('RoleClientGuard', () => {
  let guard: RoleClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
