import { TestBed } from '@angular/core/testing';

import { Access1Guard } from './access-1.guard';

describe('Access1Guard', () => {
  let guard: Access1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
