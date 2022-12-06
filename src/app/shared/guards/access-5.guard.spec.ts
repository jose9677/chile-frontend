import { TestBed } from '@angular/core/testing';

import { Access5Guard } from './access-5.guard';

describe('Access5Guard', () => {
  let guard: Access5Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access5Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
