import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDesactiveComponent } from './user-desactive.component';

describe('UserDesactiveComponent', () => {
  let component: UserDesactiveComponent;
  let fixture: ComponentFixture<UserDesactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDesactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDesactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
