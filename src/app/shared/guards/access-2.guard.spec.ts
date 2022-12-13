import { TestBed } from '@angular/core/testing';

import { Access2Guard } from './access-2.guard';

describe('Access2Guard', () => {
  let guard: Access2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
