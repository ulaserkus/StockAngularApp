import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartstockComponent } from './piechartstock.component';

describe('PiechartstockComponent', () => {
  let component: PiechartstockComponent;
  let fixture: ComponentFixture<PiechartstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
