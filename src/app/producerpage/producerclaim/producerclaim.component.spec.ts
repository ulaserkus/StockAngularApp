import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerclaimComponent } from './producerclaim.component';

describe('ProducerclaimComponent', () => {
  let component: ProducerclaimComponent;
  let fixture: ComponentFixture<ProducerclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
