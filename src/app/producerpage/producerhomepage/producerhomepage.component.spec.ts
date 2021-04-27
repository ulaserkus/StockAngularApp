import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerhomepageComponent } from './producerhomepage.component';

describe('ProducerhomepageComponent', () => {
  let component: ProducerhomepageComponent;
  let fixture: ComponentFixture<ProducerhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerhomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
