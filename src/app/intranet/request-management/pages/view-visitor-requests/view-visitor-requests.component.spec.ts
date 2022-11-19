import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitorRequestsComponent } from './view-visitor-requests.component';

describe('ViewVisitorRequestsComponent', () => {
  let component: ViewVisitorRequestsComponent;
  let fixture: ComponentFixture<ViewVisitorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVisitorRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
