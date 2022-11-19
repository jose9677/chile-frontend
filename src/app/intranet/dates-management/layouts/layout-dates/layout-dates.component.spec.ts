import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDatesComponent } from './layout-dates.component';

describe('LayoutDatesComponent', () => {
  let component: LayoutDatesComponent;
  let fixture: ComponentFixture<LayoutDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
