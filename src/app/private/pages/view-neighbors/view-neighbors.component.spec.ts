import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNeighborsComponent } from './view-neighbors.component';

describe('ViewNeighborsComponent', () => {
  let component: ViewNeighborsComponent;
  let fixture: ComponentFixture<ViewNeighborsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNeighborsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNeighborsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
