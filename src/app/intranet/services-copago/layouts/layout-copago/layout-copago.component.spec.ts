import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCopagoComponent } from './layout-copago.component';

describe('LayoutCopagoComponent', () => {
  let component: LayoutCopagoComponent;
  let fixture: ComponentFixture<LayoutCopagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCopagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
