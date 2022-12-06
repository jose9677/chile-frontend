import { TestBed } from '@angular/core/testing';

import { Access4Guard } from './access-4.guard';

describe('Access4Guard', () => {
  let guard: Access4Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Access4Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
