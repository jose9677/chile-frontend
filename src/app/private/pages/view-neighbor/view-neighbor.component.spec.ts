import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNeighborComponent } from './view-neighbor.component';

describe('ViewNeighborComponent', () => {
  let component: ViewNeighborComponent;
  let fixture: ComponentFixture<ViewNeighborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNeighborComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNeighborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
