import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRutComponent } from './enter-rut.component';

describe('EnterRutComponent', () => {
  let component: EnterRutComponent;
  let fixture: ComponentFixture<EnterRutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterRutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterRutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
