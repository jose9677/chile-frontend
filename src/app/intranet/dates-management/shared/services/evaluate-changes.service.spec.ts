import { TestBed } from '@angular/core/testing';

import { EvaluateChangesService } from './evaluate-changes.service';

describe('EvaluateChangesService', () => {
  let service: EvaluateChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluateChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
