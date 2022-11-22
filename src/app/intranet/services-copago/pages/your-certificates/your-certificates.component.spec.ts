import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCertificatesComponent } from './your-certificates.component';

describe('YourCertificatesComponent', () => {
  let component: YourCertificatesComponent;
  let fixture: ComponentFixture<YourCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourCertificatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
