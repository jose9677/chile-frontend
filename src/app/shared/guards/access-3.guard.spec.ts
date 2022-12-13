import { TestBed } from '@angular/core/testing';

import { Access3Guard } from './access-3.guard';

describe('Access3Guard', () => {
  let guard: Access3Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access3Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
