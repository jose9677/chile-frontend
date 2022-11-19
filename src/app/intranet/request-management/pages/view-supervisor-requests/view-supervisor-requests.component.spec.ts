import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupervisorRequestsComponent } from './view-supervisor-requests.component';

describe('ViewSupervisorRequestsComponent', () => {
  let component: ViewSupervisorRequestsComponent;
  let fixture: ComponentFixture<ViewSupervisorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSupervisorRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupervisorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
