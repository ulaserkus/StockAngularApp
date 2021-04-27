import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerpageComponent } from './producerpage.component';

describe('ProducerpageComponent', () => {
  let component: ProducerpageComponent;
  let fixture: ComponentFixture<ProducerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
