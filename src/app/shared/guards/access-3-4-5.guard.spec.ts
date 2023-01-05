import { TestBed } from '@angular/core/testing';

import { Access345Guard } from './access-3-4-5.guard';

describe('Access345Guard', () => {
  let guard: Access345Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access345Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
