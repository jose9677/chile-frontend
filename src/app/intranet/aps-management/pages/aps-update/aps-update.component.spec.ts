import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsUpdateComponent } from './aps-update.component';

describe('ApsUpdateComponent', () => {
  let component: ApsUpdateComponent;
  let fixture: ComponentFixture<ApsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
