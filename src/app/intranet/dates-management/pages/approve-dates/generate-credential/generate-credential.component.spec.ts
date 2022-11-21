import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCredentialComponent } from './generate-credential.component';

describe('GenerateCredentialComponent', () => {
  let component: GenerateCredentialComponent;
  let fixture: ComponentFixture<GenerateCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
