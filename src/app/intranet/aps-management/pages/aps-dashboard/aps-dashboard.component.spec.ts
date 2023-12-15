import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsDashboardComponent } from './aps-dashboard.component';

describe('ApsDashboardComponent', () => {
  let component: ApsDashboardComponent;
  let fixture: ComponentFixture<ApsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
