import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutApsComponent } from './layout-aps.component';

describe('LayoutApsComponent', () => {
  let component: LayoutApsComponent;
  let fixture: ComponentFixture<LayoutApsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutApsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutApsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
