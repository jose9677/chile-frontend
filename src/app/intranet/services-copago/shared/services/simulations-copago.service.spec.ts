import { TestBed } from '@angular/core/testing';

import { SimulationsCopagoService } from './simulations-copago.service';

describe('SimulationsCopagoService', () => {
  let service: SimulationsCopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationsCopagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
