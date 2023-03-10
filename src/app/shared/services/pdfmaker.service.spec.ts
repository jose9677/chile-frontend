import { TestBed } from '@angular/core/testing';

import { PDFMAKERService } from './pdfmaker.service';

describe('PDFMAKERService', () => {
  let service: PDFMAKERService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDFMAKERService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
