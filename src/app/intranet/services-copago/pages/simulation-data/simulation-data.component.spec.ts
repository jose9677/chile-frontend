import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationDataComponent } from './simulation-data.component';

describe('SimulationDataComponent', () => {
  let component: SimulationDataComponent;
  let fixture: ComponentFixture<SimulationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
