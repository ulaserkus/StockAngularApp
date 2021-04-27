import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitpatientsComponent } from './unitpatients.component';

describe('UnitpatientsComponent', () => {
  let component: UnitpatientsComponent;
  let fixture: ComponentFixture<UnitpatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitpatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
