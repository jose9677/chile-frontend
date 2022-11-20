import { TestBed } from '@angular/core/testing';

import { SortByTablesService } from './sort-by-tables.service';

describe('SortByTablesService', () => {
  let service: SortByTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortByTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
