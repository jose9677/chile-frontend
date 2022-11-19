import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNeighborRequestsComponent } from './view-neighbor-requests.component';

describe('ViewNeighborRequestsComponent', () => {
  let component: ViewNeighborRequestsComponent;
  let fixture: ComponentFixture<ViewNeighborRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNeighborRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNeighborRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
