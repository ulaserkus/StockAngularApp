import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorpatientsComponent } from './doctorpatients.component';

describe('DoctorpatientsComponent', () => {
  let component: DoctorpatientsComponent;
  let fixture: ComponentFixture<DoctorpatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorpatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
