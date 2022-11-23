import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdminUsersComponent } from './layout-admin-users.component';

describe('LayoutAdminUsersComponent', () => {
  let component: LayoutAdminUsersComponent;
  let fixture: ComponentFixture<LayoutAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAdminUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
