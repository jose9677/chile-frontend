import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaymentSimulatorComponent } from './copayment-simulator.component';

describe('CopaymentSimulatorComponent', () => {
  let component: CopaymentSimulatorComponent;
  let fixture: ComponentFixture<CopaymentSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopaymentSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopaymentSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
