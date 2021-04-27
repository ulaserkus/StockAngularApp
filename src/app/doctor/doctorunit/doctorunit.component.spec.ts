import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorunitComponent } from './doctorunit.component';

describe('DoctorunitComponent', () => {
  let component: DoctorunitComponent;
  let fixture: ComponentFixture<DoctorunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorunitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
