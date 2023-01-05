import { TestBed } from '@angular/core/testing';

import { Access45Guard } from './access-4-5.guard';

describe('Access45Guard', () => {
  let guard: Access45Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access45Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
