import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitdoctorsComponent } from './unitdoctors.component';

describe('UnitdoctorsComponent', () => {
  let component: UnitdoctorsComponent;
  let fixture: ComponentFixture<UnitdoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitdoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
