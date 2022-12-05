import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminRequestsComponent } from './view-admin-requests.component';

describe('ViewAdminRequestsComponent', () => {
  let component: ViewAdminRequestsComponent;
  let fixture: ComponentFixture<ViewAdminRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
