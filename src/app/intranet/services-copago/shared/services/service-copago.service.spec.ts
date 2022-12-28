import { TestBed } from '@angular/core/testing';

import { ServiceCopagoService } from './service-copago.service';

describe('ServiceCopagoService', () => {
  let service: ServiceCopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCopagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
