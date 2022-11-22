import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSimulationComponent } from './cancel-simulation.component';

describe('CancelSimulationComponent', () => {
  let component: CancelSimulationComponent;
  let fixture: ComponentFixture<CancelSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelSimulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
