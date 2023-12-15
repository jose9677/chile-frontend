import { TestBed } from '@angular/core/testing';

import { ApsManagementService } from './aps-management.service';

describe('ApsManagementService', () => {
  let service: ApsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
